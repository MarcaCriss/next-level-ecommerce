export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
}

export interface Category {
  id?: number;
  name:string;
}

export interface Photo {
  id?: number;
  name: string;
  productId: Product;
}

export interface PhotoResponse {
  id?: number;
  name: string;
  product: Product;
}
