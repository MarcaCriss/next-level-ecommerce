import { User } from '../../core/auth/interfaces/interfaces';
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
  name: string;
  products?: Product[];
}

export interface Photo {
  id?: number;
  name: string;
  url: string;
  productId?: Product;
}

export interface PhotoResponse {
  id?: number;
  name: string;
  product: Product;
}

export interface Pedido {
  id?: number;
  user: User;
  products: PedidoProduct[];
  createAt?: string;
  updateAt?: string;
}

export interface PedidoProduct {
  id?: number;
  price: number;
  name: string;
  quantity: number;
}

export interface PedidoCreate {
  id?: number;
  pedidoId: number;
  productId: number;
  price: number;
  quantity: number;
  name: string;
}

export interface AddProductToPedido {
  id?: number;
  pedidoId: number;
  productId: number[];
  price: number[];
  quantity: number[];
}

export interface ResponseAWS {
  Bucket: string
  ETag: string
  Key: string
  Location: string
  key: string
}