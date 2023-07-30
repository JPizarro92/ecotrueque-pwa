export interface PostsResponse {
    posts: Post[];
  }
  
  export interface CategoriesResponse {
    categories: Category[];
  }
  
  export interface ExchangeResponse {
    exchanges: Exchange[];
  }
  
  export interface Post {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
    title?: string;
    price?: number;
    short_description?: string;
    long_description?: string;
    exchange_rate?: string;
    tags?: string;
    product_status?: string;
    post_status?: boolean;
    user_id?: string;
    user?: User;
    category_id?: number;
    category?: Category;
    images?: null;
  }
  
  export interface Image {
    id?: number;
    img: string;
    status: boolean
  }
  
  export interface User {
    id?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    location?: string;
    position?: false;
    token?: string;
    is_active?: boolean;
    role?: string;
    avatar?: string;
    birth_date?: Date;
    age?: number;
    refresh_token?: string;
    rating_score?: number;
    ratings?: null;
    posts?: null;
  }
  
  export interface UserLogin {
    email?: string;
    password?: string;
  }
  
  export interface Category {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
    name?: string;
    icon?: string;
    posts?: null;
  }
  
  export interface Exchange {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
    message?: string;
    observations?: string;
    status?: string;
    proposed_user_id?: string;
    proposed_user?: User;
    proposed_post_id?: number;
    proposed_post?: Post;
    post_user_id?: string;
    post_user?: User;
    user?: User,
    post_shared_id?: number;
    post_shared?: Post;
  }
  
  export interface LocalFile {
    name: string;
    path: string;
    data: string;
  }
  