import { Category, Photo } from "./interfaces";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  photos?: Photo[];
}
