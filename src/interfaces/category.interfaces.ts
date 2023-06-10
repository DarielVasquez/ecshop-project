//category interfaces

export interface Category {
  category: string;
}

export interface CategoriesState {
  data: Category[];
  loading: boolean;
  error: string;
}
