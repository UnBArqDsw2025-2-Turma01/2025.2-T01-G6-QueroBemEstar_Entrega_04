export type MealType = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';

export interface Autor {
  nome: string;
}

export interface Recipe {
  id: number;
  titulo: string;
  descricao: string;
  ingredientes: string[];
  modoPreparo: string;
  fotoUrl: string;
  dataPublicacao: string;
  dataAtualizacao: string;
  autor: Autor;
  authorName?: string;
  authorAvatarUrl?: string;
  mealType?: MealType;
  createdAtRelative?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  slug?: string;
  likes?: number;
  comments?: number;
  saves?: number;
}

export interface RecipeResponse {
  data: Recipe[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
