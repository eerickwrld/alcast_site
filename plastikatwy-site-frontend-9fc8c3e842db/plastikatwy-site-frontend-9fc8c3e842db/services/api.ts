import {BlogPost, BlogResponse, BlogCategory, PageResponse, Segment, ConfigData} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://energetic-love-production.up.railway.app/api';
/**
 * Busca os dados de uma página específica pelo slug
 * @param slug - O slug da página a ser buscada
 */
export async function getPageBySlug(slug: string, language: string): Promise<PageResponse> {
  let currentLang = language || "pt_BR"

  if (language === "pt-BR") {
    currentLang = "pt_BR"
  }

  const response = await fetch(`${API_URL}/pages/${slug}?language=${currentLang}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log(`Erro ao buscar a página com slug: ${slug}`);

    return
  }

  return response.json();
}

/**
 * Busca posts do blog com paginação e filtros opcionais
 * @param page - Número da página (começa em 1)
 * @param perPage - Quantidade de posts por página
 * @param category - Slug da categoria para filtrar (opcional)
 */
export async function getBlogPosts(page: number = 1, perPage: number = 9, category?: string): Promise<BlogResponse> {
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
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar posts do blog');

    return
  }

  return response.json();
}

/**
 * Busca um post específico pelo slug
 * @param slug - O slug do post a ser buscado
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/blog/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });


  if (!response.ok) {
    console.log(`Erro ao buscar post com slug: ${slug}`);

    return
  }

  return response.json();
}

/**
 * Busca todas as categorias do blog
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const response = await fetch(`${API_URL}/blog/categories`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    // console.log Error('Erro ao buscar categorias do blog');

    return
    return [];
  }

  const responseData = await response.json();

  return responseData?.categories || [];
}

/**
 * Busca os posts mais recentes do blog (para preview)
 * @param limit - Número máximo de posts a serem retornados
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const response = await fetch(`${API_URL}/blog/recent?limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar posts recentes');

    return
  }

  return response.json();
}

/**
 * Busca comentários de um post específico
 * @param postId - O ID do post a ser buscado
 */
export async function getPostComments(postId: number | string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const response = await fetch(`${apiUrl}/blog/${postId}/comments`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  const responseData = await response.json();
  return responseData.data;
}

/**
 * Envia um comentário para um post específico
 * @param postId - O ID do post a ser comentado
 * @param data - Dados do comentário
 */
export async function postComment(postId: number | string, data: {
  name: string;
  email: string;
  message: string;
  parent_id: number | null;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const response = await fetch(`${apiUrl}/blog/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log('Erro ao enviar comentário');

    return
  }

  const responseData = await response.json();
  return responseData;
}

export async function submitQuote(data: any) {
  const response = await fetch(`${API_URL}/budget`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log('Erro ao enviar comentário');

    return
  }

  const responseData = await response.json();
  return responseData;
}

/**
 * Busca os segmentos da API
 */
export async function getSegments(props): Promise<Segment[]> {
  const quotation = props?.quotation || false;
  const response = await fetch(`${API_URL}/segments?quotation=${quotation ? 1 : 0}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    console.log('Erro ao buscar segmentos');

    return
  }

  return response.json();
}

/**
 * Busca os segmentos com um limite opcional
 * @param limit - Quantidade máxima de segmentos a serem retornados
 */
export async function getSegmentsWithLimit(limit: number = 3): Promise<Segment[]> {
  const response = await fetch(`${API_URL}/segments?limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar segmentos');

    return
  }

  return response.json();
}

/**
 * Busca as configurações gerais da API
 */
export async function getConfig(): Promise<ConfigData> {
  const response = await fetch(`${API_URL}/config`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar configurações');

    return
  }

  return response.json();
}

/**
 * Busca os produtos da API
 */
export async function getProducts(language: string = "pt_BR") {
  let currentLang = language || "pt_BR"

  if (language === "pt-BR") {
    currentLang = "pt_BR"
  }

  const response = await fetch(`${API_URL}/products?language=${currentLang}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar produtos');

    return
  }

  return response.json();
}

/**
 * Busca um produto através do slug
 */
export async function getProductBySlug(slug: string, language: string = "pt_BR") {
  let currentLang = language || "pt_BR"

  if (language === "pt-BR") {
    currentLang = "pt_BR"
  }

  const response = await fetch(`${API_URL}/products/${currentLang}/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log('Erro ao buscar produtos');

    return
  }

  return response.json();
}

export async function getMenuBySlug(slug: string, locale: string) {
  let currentLang = locale || "pt_BR"

  if (locale === "pt-BR") {
    currentLang = "pt_BR"
  }

  const response = await fetch(`${API_URL}/menus/${slug}?language=${currentLang}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    next: {
      revalidate: 1 // Revalidar a cada 1 hora
    }
  });

  if (!response.ok) {
    console.log(`Erro ao buscar menu ${slug}`);

    return
  }

  return response.json();
}
