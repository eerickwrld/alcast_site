import {BlogResponse} from './types';
import type {Language} from '@/contexts/language-context';
import {getContentByLanguage} from "@/helpers/getContentByLanguage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.alcast.com.br';

/**
 * Busca posts do blog do endpoint /blog
 * @param page - Número da página (começa em 1)
 * @param perPage - Quantidade de posts por página
 * @param category - Slug da categoria para filtrar (opcional)
 */
export async function fetchBlogPosts(page: number = 1, perPage: number = 9, category?: string, limit?: number): Promise<BlogResponse> {
  // Usando o endpoint /blog conforme especificado
  let url = `${API_URL}/blog`;

  // Adicionando parâmetros de query se necessário
  const params = new URLSearchParams();
  if (page > 1) {
    params.append('page', page.toString());
  }

  if (perPage !== 9) {
    params.append('per_page', perPage.toString());
  }

  if (limit) {
    params.append('limit', limit);
  }

  if (category) {
    params.append('category', category);
  }

  // Adiciona os parâmetros à URL se existirem
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar posts do blog: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Busca um post específico pelo slug
 * @param slug - Slug do post a ser buscado
 */
export async function fetchBlogPostBySlug(slug: string): Promise<any> {
  const url = `${API_URL}/blog/${slug}`;
  
  const response = await fetch(url, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar post do blog: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Função para processar um post da API para compatibilidade com o componente BlogCard
 * @param post - Post da API
 * @param language - Idioma para exibição (obrigatório)
 */
export function processApiPost(post: any, language: Language): any {
  // Usar título no idioma preferido, com fallback para o outro idioma
  const title = getContentByLanguage(post.title, language);
  const tags = post.tags?.map((tag: any) => ({
    id: tag.id,
    name: getContentByLanguage(post.name, language),
    slug: getContentByLanguage(post.slug, language),
  }));

  // Extrair um excerpt do conteúdo se não existir
  let excerpt = '';
  if (post.description) {
    excerpt = getContentByLanguage(post.description, language)
  }

  // Autor temporário (pode ser substituído quando a API fornecer autores)
  const author = {
    id: 1,
    name: "Equipe Alcast",
    avatar: "/images/avatar-team.png"
  };

  return {
    ...post,
    title, // Substitui o objeto title pelo valor em string
    excerpt,
    category: tags[0], // Substitui o objeto category pelo primeiro tag
    author,
    reading_time: 5 // Valor padrão para tempo de leitura
  };
}
