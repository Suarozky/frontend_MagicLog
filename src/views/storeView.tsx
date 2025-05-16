"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/card/productCard";
import {
  FaListUl,
  FaThLarge,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Shoe = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating?: number;
  imageUrl: string;
};

const sampleShoes: Shoe[] = [
  {
    id: "1",
    name: "Zapatillas Urbanas",
    price: 120,
    description: "Comodidad para el día a día.",
    category: "Urbano",
    rating: 4.5,
    imageUrl: "/product/zapato.svg",
  },
  {
    id: "2",
    name: "Zapatos de vestir",
    price: 250,
    description: "Elegancia y estilo.",
    category: "Formal",
    rating: 4.8,
    imageUrl: "/product/zapato2.svg",
  },
  {
    id: "3",
    name: "Botines de cuero",
    price: 300,
    description: "Duraderos y resistentes.",
    category: "Casual",
    rating: 4.2,
    imageUrl: "/product/zapato3.svg",
  },
  {
    id: "4",
    name: "Zapatillas deportivas",
    price: 150,
    description: "Ideales para entrenar.",
    category: "Deportivo",
    rating: 4.6,
    imageUrl: "/product/zapato4.svg",
  },
];

const categories = ["Todos", "Deportivo", "Urbano", "Formal", "Casual"];

export default function StoreView() {
  const [products, setProducts] = useState<Shoe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("destacado");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Todos",
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Simulamos carga de datos
    setTimeout(() => {
      setProducts(sampleShoes);
    }, 300);
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === "Todos") {
      setSelectedCategories(["Todos"]);
    } else {
      const newCategories = selectedCategories.includes("Todos")
        ? [category]
        : selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

      setSelectedCategories(newCategories.length ? newCategories : ["Todos"]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortOption("destacado");
    setSelectedCategories(["Todos"]);
    setPriceRange([0, 500]);
  };

  const filteredShoes = products.filter((shoe) => {
    const matchesSearch = shoe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.includes("Todos") ||
      selectedCategories.includes(shoe.category);
    const matchesPrice =
      shoe.price >= priceRange[0] && shoe.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortOption === "destacado") {
      return (b.rating ?? 0) - (a.rating ?? 0);
    } else if (sortOption === "precio-bajo") {
      return a.price - b.price;
    } else if (sortOption === "precio-alto") {
      return b.price - a.price;
    }
    return 0;
  });

  // Renderizado de estrellas para la calificación

  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros para móvil */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
            >
              <FaFilter /> {mobileFiltersOpen ? "Cerrar filtros" : "Filtros"}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-600"
                }`}
              >
                <FaListUl />
              </button>
            </div>
          </div>

          {/* Panel de filtros móvil */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-4"
              >
                <div className="bg-white p-4 rounded-lg shadow-md">
                  {/* Contenido de filtros para móvil */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Limpiar
                    </button>
                  </div>

                  {/* Categorías */}
                  <div className="mb-4">
                    <h3 className="text-sm font-bold mb-2 uppercase text-gray-700">
                      Categorías
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`px-3 py-1 text-sm rounded-full ${
                            selectedCategories.includes(category)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Precio */}
                  <div>
                    <h3 className="text-sm font-bold mb-2 uppercase text-gray-700">
                      Precio
                    </h3>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filtros para desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Limpiar
                </button>
              </div>

              {/* Categorías */}
              <div className="mb-8">
                <h3 className="text-sm font-bold mb-3 uppercase text-gray-700">
                  Categorías
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precio */}
              <div className="mb-8">
                <h3 className="text-sm font-bold mb-3 uppercase text-gray-700">
                  Precio
                </h3>
                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-gray-100 px-2 py-1 rounded w-20">
                      <span className="text-gray-700">${priceRange[0]}</span>
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="bg-gray-100 px-2 py-1 rounded w-20 text-right">
                      <span className="text-gray-700">${priceRange[1]}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              {/* Estado filtros */}
              <div className="mt-8 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-xs font-bold text-blue-700 mb-1">
                  FILTROS ACTIVOS
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedCategories.length === 1 &&
                  selectedCategories[0] === "Todos"
                    ? "Todas las categorías"
                    : `${selectedCategories.length} ${
                        selectedCategories.length === 1
                          ? "categoría"
                          : "categorías"
                      }`}
                </p>
                <p className="text-sm text-gray-600">
                  Precio: ${priceRange[0]} - ${priceRange[1]}
                </p>
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de herramientas */}
            <div className="bg-white p-4 rounded-xl shadow-sm ">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Buscador */}
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="Buscar zapatos..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Ordenar y visualización */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <select
                    className="py-2 px-3 rounded-lg border border-gray-200 bg-white focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="destacado">Destacados</option>
                    <option value="precio-bajo">Precio: Menor a Mayor</option>
                    <option value="precio-alto">Precio: Mayor a Menor</option>
                  </select>

                  {/* Botones de visualización - Solo en desktop */}
                  <div className="hidden md:flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaThLarge />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaListUl />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="flex justify-between items-center ">
              <p className="text-sm text-gray-600 p-2">
                {sortedShoes.length} productos encontrados
              </p>
            </div>

            {/* Lista de productos */}
            {products.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : sortedShoes.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                <AnimatePresence>
                  {sortedShoes.map((shoe) => (
                    <motion.div
                      key={shoe.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className={
                        viewMode === "grid"
                          ? "transform transition-all duration-300 hover:shadow-lg"
                          : "transform transition-all duration-300 hover:shadow-lg"
                      }
                    >
                      <ProductCard
                        shoe={shoe}
                        onAddToCart={(id) => {
                          console.log("Agregar al carrito:", id);
                          // aquí puedes disparar una acción o función de Redux, Zustand, etc.
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <h3 className="text-xl font-medium text-gray-700 ">
                  No encontramos resultados
                </h3>
                <p className="text-gray-500 mb-4">
                  Intenta con otra búsqueda o ajusta los filtros
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
