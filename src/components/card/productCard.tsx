import { useState } from "react";
import type { Product } from "../../types/products";
import { useNavigate } from "react-router-dom";
import { createCartItem } from "../../api/cart-items";
import type { CartItem } from "../../types/cart-item";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (id: number) => void;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products?id=${product.id}`);
    console.log("Product ID:", product.id);
    console.log("Product IMAGE:", product);
  };

  const handleAddCart = () => {
    const item: CartItem = {
      productId: (product.id as number), // O usar `product.id.toString()` si estás seguro de que `id` es numérico
      quantity: 1, // O cualquier lógica para determinar la cantidad
    };

    createCartItem(item);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden w-80  flex flex-col"
      onClick={handleCardClick}
    >
      {/* Image container - with placeholder since Product doesn't have imageUrl */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            setIsImageLoaded(false);
            console.error("Error cargando imagen:", product.image);
          }}
        />

        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Cargando...</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* SKU */}
        <div className="text-blue-600 text-sm font-medium mb-1">
          SKU: {product.sku}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>

        {/* Created date */}
        <p className="text-sm text-gray-600 mb-2">
          Added: {new Date(product.createdAt).toLocaleDateString()}
        </p>

        {/* Stock quantity */}
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-600">
            In stock: {product.quantity}
          </span>
        </div>

        {/* Price and action */}
        <div className="mt-auto pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <button
            key={product.id}
            onClick={handleAddCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
