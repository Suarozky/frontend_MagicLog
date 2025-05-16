export type Shoe = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating?: number; // opcional porque el componente lo trata como tal
};
