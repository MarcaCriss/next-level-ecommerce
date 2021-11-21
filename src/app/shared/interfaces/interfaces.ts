export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  photos?: Photo[];
}

export interface Category {
  id?: number;
  name:string;
  products?: Product[];
}

export interface Photo {
  id?: number;
  name: string;
  productId?: Product;
}

export interface PhotoResponse {
  id?: number;
  name: string;
  product: Product;
}
