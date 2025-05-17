export type Shoe = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  rating?: number; // opcional porque el componente lo trata como tal
};