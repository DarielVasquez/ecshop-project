//product interfaces

export interface Product {
  category: string;
  description: string;
  id: number;
  price: number;
  rating: { count: number; rate: number };
  image: string;
  title: string;
}

export interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string;
}

//cart interfaces

export interface CartProduct extends Product {
  amount: number;
  total: number;
}

export interface CartState {
  cartItems: CartProduct[];
  totalAmount: number;
  subtotalCost: number;
  taxes: number;
  totalCost: number;
}
