import { useState } from "react";
import type { Product } from "../../types/products";
import { deleteProduct } from "../../api/products";

export default function DashboardCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  const handleDeleteProduct = () => {
    if (product.id !== undefined) {
      deleteProduct(product.id); // o sin .toString() si acepta number
      console.log(`Eliminar producto: ${product.name}`);
    } else {
      console.error("Error: el producto no tiene un ID definido.");
    }
  };

  return (
    <div className="w-full bg-white rounded overflow-hidden shadow-sm border border-gray-100 mb-4 transition-all">
      {/* Fila principal siempre visible */}
      <div className="flex items-center p-4">
        {/* Imagen y nombre del producto */}
        <div className="flex flex-1 items-center min-w-0">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              src={product.image}
              alt={product.name}
              className="rounded object-cover h-10 w-10"
            />
          </div>
          <div className="ml-3 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </div>
          </div>
        </div>

        {/* Información visible solo en pantallas medianas o grandes */}
        <div className="hidden md:flex items-center space-x-8 mx-4">
          <div className="text-sm text-gray-900 w-20 text-center">
            <span className="block text-xs text-gray-500">Precio</span>$
            {product.price}
          </div>
          <div className="text-sm text-gray-900 w-20 text-center">
            <span className="block text-xs text-gray-500">Inventario</span>
            {product.quantity}
          </div>
          <div className="text-sm text-gray-900 w-20 text-center">
            <span className="block text-xs text-gray-500">Ventas</span>
            {product.quantity}
          </div>
        </div>

        {/* Botones de acción visibles en pantallas medianas o grandes */}
        <div className="hidden md:flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm">
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
            onClick={handleDeleteProduct}
          >
            Eliminar
          </button>
        </div>

        {/* Botón expandir para móviles */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="md:hidden ml-2 p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Panel expandible para móviles */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-48" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <span className="block text-xs text-gray-500">Precio</span>
              <span className="font-medium">${product.price}</span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-gray-500">Inventario</span>
              <span className="font-medium">{product.quantity}</span>
            </div>
            <div className="text-center">
              <span className="block text-xs text-gray-500">Ventas</span>
              <span className="font-medium">{product.quantity}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <button className="flex-1 mr-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
              Editar
            </button>
            <button
              className="flex-1 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50"
              onClick={handleDeleteProduct}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
