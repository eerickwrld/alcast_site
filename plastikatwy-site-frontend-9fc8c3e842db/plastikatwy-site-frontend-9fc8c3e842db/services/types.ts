export interface BannerItem {
  custom_fields_data: {
    link: string | null;
    image: string;
    title: string | null;
    subtitle: string | null;
  };
}

export interface QualityItem {
  custom_fields_data: {
    icon: string;
    image: string;
    title: string;
  };
}

export interface CertificationItem {
  custom_fields_data: {
    image: string;
  };
}

export interface PageResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  page_template_id: number;
  custom_fields_data: {
    stats?: {
      title_stats_1: string;
      title_stats_2: string;
      title_stats_3: string;
      title_stats_4: string;
      description_stats_1: string;
      description_stats_2: string;
      description_stats_3: string;
      description_stats_4: string;
    };
    qualidade?: {
      qualities: QualityItem[];
    };
    'secao-banner'?: {
      banner: BannerItem[];
    };
    'secao-certificacoes'?: {
      title: string;
      certifications: CertificationItem[];
    };
    'secao-sustentabilidade'?: {
      image: string;
      title: string;
      description: string;
      link_button: string;
      text_button: string;
    };
    // Mantendo campos antigos para compatibilidade
    quality?: QualityItem[];
    banner_home?: BannerHomeItem[];
    certificados_title?: string;
    certificados_images?: CertificadoImage[];
  };
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Mantendo interfaces antigas para compatibilidade
export interface BannerHomeItem {
  custom_fields_data: {
    Image: string;
  };
}

export interface CertificadoImage {
  custom_fields_data: {
    images: string;
  };
}

export interface Segment {
  id: number;
  name: {
    pt_BR: string;
    en: string;
  };
  description: {
    pt_BR: string;
    en: string;
  };
  slug: string;
  image: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  user_id: number;
  title: {
    'en': string;
    'pt-BR': string;
  };
  slug: string;
  description: {
    'pt-BR'?: string;
    'en'?: string;
  };
  content: {
    'pt-BR': string;
    'en': string | object;
  };
  featured_image: string | null;
  post_type: string;
  parent_id: number | null;
  ordering: number;
  password: string | null;
  status: string;
  sticky_until: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tags: any[];
  
  // Campos derivados para compatibilidade com o componente atual
  excerpt?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  author?: {
    id: number;
    name: string;
    avatar?: string;
  };
  reading_time?: number;
  meta_title?: string;
  meta_description?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  post_count: number;
}

export interface BlogResponse {
  posts: BlogPost[];
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ConfigData {
  id: number;
  title: string;
  sectors: {
    sectors: {
      name: string;
      email: string;
    };
  }[];
  address: {
    map: string;
    city: string;
    state: string;
    address: string;
    country: string;
  };
  social_networks: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  created_at: string;
  updated_at: string;
  contact_info: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  footer_info: {
    policy_privacy: {
      title?: string;
      description?: string;
      url?: string;
    };
    policy_quality: {
      title?: string;
      description?: string;
    };
    policy_environmental: {
      title?: string;
      description?: string;
    };
  };
}

export interface Product {
  id: number;
  name: {
    pt_BR: string;
    en: string;
    es: string;
  };
  description: {
    pt_BR: string;
    en: string;
    es: string;
  };
  image: {
    pt_BR: string;
    en: string;
  };
  status: number;
  created_at: string;
  updated_at: string;
  banner: string;
  images_product_use: string[];
}
