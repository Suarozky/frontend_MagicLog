import { useEffect, useState } from "react";
import ProductCard from "../../components/card/productCard";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/products";

const PRODUCTS_PER_PAGE = 3;

function HomeList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.products);
        // Mostrar solo los primeros PRODUCTS_PER_PAGE productos inicialmente
        setVisibleProducts(response.products.slice(0, PRODUCTS_PER_PAGE));
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (showAll) {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(products.slice(0, PRODUCTS_PER_PAGE));
    }
  }, [showAll, products]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-4 w-full">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > PRODUCTS_PER_PAGE && (
        <button
          onClick={toggleShowAll}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {showAll ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}

export default HomeList;
