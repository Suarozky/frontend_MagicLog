export type Product = {
  id?: number;
  name: string;
  sku: string;
  quantity: number;
  image : string;
  price: number;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
};

export type ProfileType = {
  id: string;
  name: string;
  image: string;
  email: string;
  role: number;
};

export type NewProductForm = {
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  inventory: string;
};

export type ProductData = {
  name: string;
  sku: string;
  image: string;
  quantity: number;
  price: number;
};
