import { BlogPost, BlogCategory } from "@/services/types";

export const placeholderBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A importância da reciclagem de alumínio para o meio ambiente",
    slug: "importancia-reciclagem-aluminio-meio-ambiente",
    content: `
      <p>O alumínio é um dos materiais mais versáteis e amplamente utilizados no mundo. Uma de suas características mais importantes é a capacidade de ser reciclado infinitamente sem perder suas propriedades. Neste artigo, vamos explorar como a reciclagem de alumínio contribui significativamente para a preservação do meio ambiente.</p>

      <h2>Economia de energia</h2>
      <p>A reciclagem de alumínio economiza aproximadamente 95% da energia necessária para produzir alumínio a partir da bauxita. Isso representa uma redução significativa nas emissões de carbono e no consumo de recursos naturais.</p>

      <h2>Redução de resíduos em aterros</h2>
      <p>Latas e outros produtos de alumínio podem levar mais de 500 anos para se decompor completamente. Ao reciclar esses materiais, reduzimos drasticamente a quantidade de resíduos enviados para aterros sanitários.</p>

      <h2>Preservação de recursos naturais</h2>
      <p>A produção de alumínio primário requer a extração de bauxita, um processo que causa impacto ambiental significativo. A reciclagem diminui a necessidade de mineração, preservando áreas naturais.</p>

      <h2>O papel da Alcast na sustentabilidade</h2>
      <p>Na Alcast, estamos comprometidos com práticas sustentáveis em toda nossa cadeia produtiva. Investimos constantemente em tecnologias que reduzem nosso impacto ambiental e promovem a economia circular do alumínio.</p>

      <p>Para saber mais sobre nossas iniciativas de sustentabilidade, visite nossa página de ESG.</p>
    `,
    excerpt: "Descubra como a reciclagem de alumínio contribui para a preservação ambiental e por que este metal é considerado um dos materiais mais sustentáveis do planeta.",
    featured_image: "/blog/meio-ambiente.png",
    category: {
      id: 1,
      name: "Sustentabilidade",
      slug: "sustentabilidade"
    },
    author: {
      id: 1,
      name: "Equipe Alcast",
      avatar: "/images/avatar-team.png"
    },
    published_at: "2025-08-10T15:30:00Z",
    created_at: "2025-08-09T10:00:00Z",
    updated_at: "2025-08-10T15:30:00Z",
    meta_title: "A importância da reciclagem de alumínio para o meio ambiente | Alcast",
    meta_description: "Descubra como a reciclagem de alumínio contribui para a preservação ambiental e economia de energia.",
    reading_time: 5
  },
  {
    id: 2,
    title: "O processo de fabricação de latas de alumínio",
    slug: "processo-fabricacao-latas-aluminio",
    content: `
      <p>As latas de alumínio são um dos produtos mais utilizados no nosso dia a dia, mas poucas pessoas conhecem o processo detalhado de sua fabricação. Neste artigo, explicamos passo a passo como as latas de alumínio são produzidas.</p>

      <h2>Extrusão e estiramento</h2>
      <p>O processo começa com a extrusão do alumínio em formato de discos, que são depois estirados para formar o corpo básico da lata.</p>

      <h2>Corte e formação</h2>
      <p>Após o estiramento, as bordas são cortadas para garantir um tamanho uniforme, e o formato final da lata é definido.</p>

      <h2>Lavagem e tratamento</h2>
      <p>As latas passam por processos de lavagem e tratamento químico para preparar a superfície para impressão.</p>

      <h2>Impressão e verniz</h2>
      <p>A parte externa das latas é impressa com designs e informações do produto, seguida da aplicação de verniz protetor.</p>

      <h2>Formação do gargalo e da tampa</h2>
      <p>O gargalo é formado para permitir o encaixe perfeito com a tampa, que é produzida separadamente.</p>

      <p>Na Alcast, utilizamos tecnologia de ponta para garantir que nossas latas atendam aos mais altos padrões de qualidade e sustentabilidade.</p>
    `,
    excerpt: "Conheça em detalhes o fascinante processo de fabricação das latas de alumínio, desde a matéria-prima até o produto final pronto para uso.",
    featured_image: "/blog/latas-de-aluminio.png",
    category: {
      id: 2,
      name: "Processos",
      slug: "processos"
    },
    author: {
      id: 1,
      name: "Equipe Alcast",
      avatar: "/images/avatar-team.png"
    },
    published_at: "2025-07-25T09:15:00Z",
    created_at: "2025-07-20T14:30:00Z",
    updated_at: "2025-07-25T09:15:00Z",
    meta_title: "O processo de fabricação de latas de alumínio | Alcast",
    meta_description: "Descubra como as latas de alumínio são fabricadas, do disco inicial à lata pronta para uso.",
    reading_time: 7
  },
  {
    id: 3,
    title: "Conservação de recursos do planeta através do alumínio",
    slug: "conservacao-recursos-planeta-aluminio",
    content: `
      <p>O alumínio é um elemento crucial na estratégia global de conservação de recursos naturais. Sua capacidade de reciclagem infinita e suas propriedades únicas fazem dele um aliado essencial na luta pela sustentabilidade.</p>

      <h2>Ciclo de vida completo</h2>
      <p>Ao contrário de muitos materiais, o alumínio mantém um ciclo de vida fechado, podendo ser reciclado e reutilizado sem limites.</p>

      <h2>Redução da pegada de carbono</h2>
      <p>A utilização de alumínio reciclado reduz significativamente a pegada de carbono associada à produção deste metal.</p>

      <h2>Durabilidade excepcional</h2>
      <p>Produtos de alumínio são extremamente duráveis, o que significa menos substituições e menos resíduos ao longo do tempo.</p>

      <h2>Inovações em eficiência</h2>
      <p>A indústria do alumínio continua desenvolvendo processos mais eficientes que reduzem o consumo de energia e água.</p>

      <p>Na Alcast, acreditamos que a responsabilidade ambiental é um compromisso contínuo e investimos constantemente em tecnologias que otimizam o uso de recursos em nossa produção.</p>
    `,
    excerpt: "Saiba como o uso inteligente do alumínio pode ajudar a preservar os recursos naturais do nosso planeta e contribuir para um futuro mais sustentável.",
    featured_image: "/blog/recursos-planeta.png",
    category: {
      id: 1,
      name: "Sustentabilidade",
      slug: "sustentabilidade"
    },
    author: {
      id: 2,
      name: "Maria Silva",
      avatar: "/images/avatar-maria.png"
    },
    published_at: "2025-06-15T11:45:00Z",
    created_at: "2025-06-10T08:20:00Z",
    updated_at: "2025-06-15T11:45:00Z",
    meta_title: "Conservação de recursos do planeta através do alumínio | Alcast",
    meta_description: "Descubra como o alumínio contribui para a conservação dos recursos naturais do planeta através de sua reciclabilidade infinita.",
    reading_time: 6
  },
  {
    id: 4,
    title: "A importância da reciclagem de alumínio para o meio ambiente",
    slug: "importancia-reciclagem-aluminio-meio-ambiente",
    content: `
      <p>O alumínio é um dos materiais mais versáteis e amplamente utilizados no mundo. Uma de suas características mais importantes é a capacidade de ser reciclado infinitamente sem perder suas propriedades. Neste artigo, vamos explorar como a reciclagem de alumínio contribui significativamente para a preservação do meio ambiente.</p>

      <h2>Economia de energia</h2>
      <p>A reciclagem de alumínio economiza aproximadamente 95% da energia necessária para produzir alumínio a partir da bauxita. Isso representa uma redução significativa nas emissões de carbono e no consumo de recursos naturais.</p>

      <h2>Redução de resíduos em aterros</h2>
      <p>Latas e outros produtos de alumínio podem levar mais de 500 anos para se decompor completamente. Ao reciclar esses materiais, reduzimos drasticamente a quantidade de resíduos enviados para aterros sanitários.</p>

      <h2>Preservação de recursos naturais</h2>
      <p>A produção de alumínio primário requer a extração de bauxita, um processo que causa impacto ambiental significativo. A reciclagem diminui a necessidade de mineração, preservando áreas naturais.</p>

      <h2>O papel da Alcast na sustentabilidade</h2>
      <p>Na Alcast, estamos comprometidos com práticas sustentáveis em toda nossa cadeia produtiva. Investimos constantemente em tecnologias que reduzem nosso impacto ambiental e promovem a economia circular do alumínio.</p>

      <p>Para saber mais sobre nossas iniciativas de sustentabilidade, visite nossa página de ESG.</p>
    `,
    excerpt: "Descubra como a reciclagem de alumínio contribui para a preservação ambiental e por que este metal é considerado um dos materiais mais sustentáveis do planeta.",
    featured_image: "/blog/meio-ambiente.png",
    category: {
      id: 1,
      name: "Sustentabilidade",
      slug: "sustentabilidade"
    },
    author: {
      id: 1,
      name: "Equipe Alcast",
      avatar: "/images/avatar-team.png"
    },
    published_at: "2025-08-10T15:30:00Z",
    created_at: "2025-08-09T10:00:00Z",
    updated_at: "2025-08-10T15:30:00Z",
    meta_title: "A importância da reciclagem de alumínio para o meio ambiente | Alcast",
    meta_description: "Descubra como a reciclagem de alumínio contribui para a preservação ambiental e economia de energia.",
    reading_time: 5
  },
  {
    id: 5,
    title: "O processo de fabricação de latas de alumínio",
    slug: "processo-fabricacao-latas-aluminio",
    content: `
      <p>As latas de alumínio são um dos produtos mais utilizados no nosso dia a dia, mas poucas pessoas conhecem o processo detalhado de sua fabricação. Neste artigo, explicamos passo a passo como as latas de alumínio são produzidas.</p>

      <h2>Extrusão e estiramento</h2>
      <p>O processo começa com a extrusão do alumínio em formato de discos, que são depois estirados para formar o corpo básico da lata.</p>

      <h2>Corte e formação</h2>
      <p>Após o estiramento, as bordas são cortadas para garantir um tamanho uniforme, e o formato final da lata é definido.</p>

      <h2>Lavagem e tratamento</h2>
      <p>As latas passam por processos de lavagem e tratamento químico para preparar a superfície para impressão.</p>

      <h2>Impressão e verniz</h2>
      <p>A parte externa das latas é impressa com designs e informações do produto, seguida da aplicação de verniz protetor.</p>

      <h2>Formação do gargalo e da tampa</h2>
      <p>O gargalo é formado para permitir o encaixe perfeito com a tampa, que é produzida separadamente.</p>

      <p>Na Alcast, utilizamos tecnologia de ponta para garantir que nossas latas atendam aos mais altos padrões de qualidade e sustentabilidade.</p>
    `,
    excerpt: "Conheça em detalhes o fascinante processo de fabricação das latas de alumínio, desde a matéria-prima até o produto final pronto para uso.",
    featured_image: "/blog/latas-de-aluminio.png",
    category: {
      id: 2,
      name: "Processos",
      slug: "processos"
    },
    author: {
      id: 1,
      name: "Equipe Alcast",
      avatar: "/images/avatar-team.png"
    },
    published_at: "2025-07-25T09:15:00Z",
    created_at: "2025-07-20T14:30:00Z",
    updated_at: "2025-07-25T09:15:00Z",
    meta_title: "O processo de fabricação de latas de alumínio | Alcast",
    meta_description: "Descubra como as latas de alumínio são fabricadas, do disco inicial à lata pronta para uso.",
    reading_time: 7
  },
  {
    id: 6,
    title: "Conservação de recursos do planeta através do alumínio",
    slug: "conservacao-recursos-planeta-aluminio",
    content: `
      <p>O alumínio é um elemento crucial na estratégia global de conservação de recursos naturais. Sua capacidade de reciclagem infinita e suas propriedades únicas fazem dele um aliado essencial na luta pela sustentabilidade.</p>

      <h2>Ciclo de vida completo</h2>
      <p>Ao contrário de muitos materiais, o alumínio mantém um ciclo de vida fechado, podendo ser reciclado e reutilizado sem limites.</p>

      <h2>Redução da pegada de carbono</h2>
      <p>A utilização de alumínio reciclado reduz significativamente a pegada de carbono associada à produção deste metal.</p>

      <h2>Durabilidade excepcional</h2>
      <p>Produtos de alumínio são extremamente duráveis, o que significa menos substituições e menos resíduos ao longo do tempo.</p>

      <h2>Inovações em eficiência</h2>
      <p>A indústria do alumínio continua desenvolvendo processos mais eficientes que reduzem o consumo de energia e água.</p>

      <p>Na Alcast, acreditamos que a responsabilidade ambiental é um compromisso contínuo e investimos constantemente em tecnologias que otimizam o uso de recursos em nossa produção.</p>
    `,
    excerpt: "Saiba como o uso inteligente do alumínio pode ajudar a preservar os recursos naturais do nosso planeta e contribuir para um futuro mais sustentável.",
    featured_image: "/blog/recursos-planeta.png",
    category: {
      id: 1,
      name: "Sustentabilidade",
      slug: "sustentabilidade"
    },
    author: {
      id: 2,
      name: "Maria Silva",
      avatar: "/images/avatar-maria.png"
    },
    published_at: "2025-06-15T11:45:00Z",
    created_at: "2025-06-10T08:20:00Z",
    updated_at: "2025-06-15T11:45:00Z",
    meta_title: "Conservação de recursos do planeta através do alumínio | Alcast",
    meta_description: "Descubra como o alumínio contribui para a conservação dos recursos naturais do planeta através de sua reciclabilidade infinita.",
    reading_time: 6
  }
];

export const placeholderBlogCategories: BlogCategory[] = [
  {
    id: 1,
    name: "Sustentabilidade",
    slug: "sustentabilidade",
    post_count: 2
  },
  {
    id: 2,
    name: "Processos",
    slug: "processos",
    post_count: 1
  },
  {
    id: 3,
    name: "Inovação",
    slug: "inovacao",
    post_count: 0
  },
  {
    id: 4,
    name: "Mercado",
    slug: "mercado",
    post_count: 0
  }
];

export const getBlogPostBySlugPlaceholder = (slug: string): BlogPost => {
  const post = placeholderBlogPosts.find(post => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug '${slug}' not found`);
  }
  return post;
};

export const getRecentBlogPostsPlaceholder = (limit = 3): BlogPost[] => {
  return placeholderBlogPosts.slice(0, limit);
};

export const getBlogCategoriesPlaceholder = (): BlogCategory[] => {
  return placeholderBlogCategories;
};
