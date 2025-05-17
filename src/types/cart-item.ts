
export type CartItem = {
    productId: number;
    quantity: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    sku: string;
    image: string;
    quantity: number;
    price: string; // La API devuelve el precio como string
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  created_at: string;
  updated_at: string;
}