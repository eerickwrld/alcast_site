<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use LaraZeus\Sky\Enums\PostStatus;
use LaraZeus\Sky\Models\PostScope;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;
use Spatie\Translatable\HasTranslations;
use LaraZeus\Sky\Models\Post as PostZeus;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OwenIt\Auditing\Contracts\Auditable;

class Post extends PostZeus implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    public array $translatable = [
        'title',
        'content',
        'description',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    public function allComments()
    {
        return $this->hasMany(Comment::class);
    }

    protected static function boot(): void
    {
        parent::boot();

        static::updating(function ($post) {
            $content= json_decode($post->getAttributes()['content'], true);

            foreach ($content as $key =>$node) {
                if (!is_string($node) && isset($node['type']) && $node['type'] === 'doc') {
                    $content[$key] = self::proseMirrorToHtml($node);
                }
            }

            $post->setAttribute('content', $content);
        });

        static::creating(function ($post) {
            $content= json_decode($post->getAttributes()['content'], true);

            foreach ($content as $key =>$node) {
                if (!is_string($node) && isset($node['type']) && $node['type'] === 'doc') {
                    $content[$key] = self::proseMirrorToHtml($node);
                }
            }

            $post->setAttribute('content', $content);
        });
    }

    /**
     * Converte um documento ProseMirror (array PHP do JSON) para HTML.
     *
     * @param array $doc Documento ProseMirror decodificado do JSON.
     * @return string HTML renderizado.
     */
    public static function proseMirrorToHtml(array $doc): string
    {
        $renderNodes = function(array $nodes) use (&$renderNodes, &$renderNode, &$renderText): string {
            $html = '';
            foreach ($nodes as $node) {
                $html .= $renderNode($node);
            }
            return $html;
        };

        $escapeHtml = function (?string $text): string {
            return htmlspecialchars($text ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        };

        $escapeAttr = function (?string $text): string {
            return htmlspecialchars($text ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        };

        $isAllowedUrl = function (?string $url, array $allowed = ['http', 'https', 'mailto', 'tel', 'data']): bool {
            if (!$url) return false;
            // Permite data:image/* apenas
            if (str_starts_with($url, 'data:image/')) return true;
            $scheme = parse_url($url, PHP_URL_SCHEME);
            return $scheme ? in_array(strtolower($scheme), $allowed, true) : true; // URLs relativas ok
        };

        $applyMarks = function (string $text, array $marks = []) use ($escapeAttr, $isAllowedUrl): string {
            if (empty($marks)) return $text;

            // Mantém ordem estável, mas garante que link envolva por fora do code (ajuste comum)
            usort($marks, function ($a, $b) {
                $order = ['code' => 0, 'bold' => 1, 'italic' => 2, 'underline' => 3, 'strike' => 4, 'link' => 5];
                return ($order[$a['type']] ?? 99) <=> ($order[$b['type']] ?? 99);
            });

            foreach ($marks as $mark) {
                $type = $mark['type'] ?? '';
                $attrs = $mark['attrs'] ?? [];
                switch ($type) {
                    case 'bold':
                    case 'strong':
                        $text = "<strong>{$text}</strong>";
                        break;
                    case 'italic':
                    case 'em':
                        $text = "<em>{$text}</em>";
                        break;
                    case 'underline':
                        $text = "<u>{$text}</u>";
                        break;
                    case 'strike':
                    case 'strikethrough':
                        $text = "<s>{$text}</s>";
                        break;
                    case 'code':
                        $text = "<code>{$text}</code>";
                        break;
                    case 'link':
                    case 'anchor':
                        $href  = $attrs['href']  ?? '';
                        $title = $attrs['title'] ?? null;
                        if ($href && $isAllowedUrl($href)) {
                            $titleAttr = $title ? ' title="'.$escapeAttr($title).'"' : '';
                            // target/rel seguros para links externos
                            $rel = ' rel="noopener noreferrer"';
                            $target = (str_starts_with($href, 'http')) ? ' target="_blank"' : '';
                            $text = '<a href="'.$escapeAttr($href).'"'.$titleAttr.$target.$rel.'>'.$text.'</a>';
                        }
                        break;
                }
            }
            return $text;
        };

        $renderText = function (array $node) use ($escapeHtml, $applyMarks): string {
            $text = $escapeHtml($node['text'] ?? '');
            return $applyMarks($text, $node['marks'] ?? []);
        };

        $renderNode = function (array $node) use (&$renderNodes, $renderText, $escapeAttr, $escapeHtml, $isAllowedUrl): string {
            $type  = $node['type'] ?? '';
            $attrs = $node['attrs'] ?? [];
            $content = $node['content'] ?? [];

            $textAlign = isset($attrs['textAlign']) ? ' style="text-align:'.htmlspecialchars($attrs['textAlign']).';"' : '';

            switch ($type) {
                case 'text':
                    return $renderText($node);

                case 'paragraph':
                    $inner = $renderNodes($content ?? []);
                    // evita parágrafos vazios com <br> se apropriado
                    if ($inner === '') $inner = '<br>';
                    return "<p{$textAlign}>{$inner}</p>";

                case 'heading':
                    $level = (int)($attrs['level'] ?? 1);
                    $level = max(1, min(6, $level));
                    $inner = $renderNodes($content ?? []);
                    return "<h{$level}{$textAlign}>{$inner}</h{$level}>";

                case 'bullet_list':
                    return '<ul>'.$renderNodes($content ?? []).'</ul>';

                case 'ordered_list':
                    $start = isset($attrs['start']) ? (int)$attrs['start'] : null;
                    $startAttr = ($start && $start !== 1) ? ' start="'.$start.'"' : '';
                    return "<ol{$startAttr}>".$renderNodes($content ?? []).'</ol>';

                case 'list_item':
                    return '<li>'.$renderNodes($content ?? []).'</li>';

                case 'blockquote':
                    return '<blockquote>'.$renderNodes($content ?? []).'</blockquote>';

                case 'hard_break':
                    return '<br>';

                case 'horizontal_rule':
                    return '<hr>';

                case 'code_block':
                    $lang = $attrs['language'] ?? $attrs['params'] ?? null;
                    $class = $lang ? ' class="language-'.htmlspecialchars($lang).'"' : '';
                    // Conteúdo de code_block costuma vir como um único nó text
                    $raw = '';
                    foreach ($content ?? [] as $child) {
                        if (($child['type'] ?? '') === 'text') {
                            $raw .= $child['text'] ?? '';
                        }
                    }
                    $code = htmlspecialchars($raw, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
                    return "<pre><code{$class}>{$code}</code></pre>";

                case 'image':
                    $src   = $attrs['src']   ?? '';
                    $alt   = $attrs['alt']   ?? '';
                    $title = $attrs['title'] ?? null;
                    if (!$src || !$isAllowedUrl($src)) return '';
                    $titleAttr = $title ? ' title="'.$escapeAttr($title).'"' : '';
                    $altAttr   = ' alt="'.$escapeAttr($alt).'"';
                    // width/height opcionais e seguros (inteiros)
                    $size = '';
                    if (isset($attrs['width']) && is_numeric($attrs['width']))  $size .= ' width="'.(int)$attrs['width'].'"';
                    if (isset($attrs['height']) && is_numeric($attrs['height'])) $size .= ' height="'.(int)$attrs['height'].'"';
                    return '<img src="'.$escapeAttr($src).'"'.$altAttr.$titleAttr.$size.' />';

                // Tiptap/ProseMirror às vezes embalam tudo em "doc"
                case 'doc':
                    return $renderNodes($content ?? []);

                default:
                    // Nó desconhecido: renderiza seus filhos (fallback “safe”)
                    return $renderNodes($content ?? []);
            }
        };

        // Valida documento base
        if (($doc['type'] ?? '') !== 'doc') {
            // Aceita também já ser um array de nós
            $rootContent = $doc['content'] ?? ($doc[0]['type'] ?? null ? $doc : []);
            return $renderNodes($rootContent);
        }

        return $renderNodes($doc['content'] ?? []);
    }

    public function getContent(): string
    {
        return $this->content;
    }
}
