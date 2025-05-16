import { useState } from "react";
import type { Shoe } from "../../types/product";

type ProductCardProps = {
  shoe: Shoe;
  onAddToCart?: (id: string) => void;
};

const ProductCard = ({ shoe, onAddToCart }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(shoe.id);
    }
  };

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-76 flex flex-col">
      {/* Image container - simplified */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={shoe.imageUrl}
          alt={shoe.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-contain ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Content - simplified */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="text-blue-600 text-sm font-medium mb-1">
          {shoe.category}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-1">{shoe.name}</h3>
        
        {/* Description - shorter */}
        <p className="text-sm text-gray-600 mb-2">{shoe.description}</p>

        {/* Rating */}
        {shoe.rating && (
          <div className="flex items-center mb-2">
            <div className="flex">
              {renderStars(shoe.rating)}
            </div>
            <span className="ml-1 text-sm text-gray-600">({shoe.rating})</span>
          </div>
        )}

        {/* Price and action */}
        <div className="mt-auto pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${shoe.price}</span>
          
          <button 
            onClick={handleAddToCart}
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