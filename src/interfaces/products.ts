export interface ProductProps {
  _id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}
