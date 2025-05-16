// components/VendorDashboard.tsx
"use client";

import { useState } from "react";
import { CustomerList } from "../components/list/customerList";
import { DashBoardList } from "../components/list/dashboardList";

export default function SellerView() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("products");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inventory: "",
  });

  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Nike Air Max",
      image: "/product/zapato.svg",
      price: 129.99,
      category: "Sneakers",
      inventory: 45,
      sales: 127,
    },
    {
      id: "2",
      name: "Adidas Ultraboost",
      image: "/product/zapato2.svg",
      price: 149.99,
      category: "Running",
      inventory: 32,
      sales: 98,
    },
    {
      id: "3",
      name: "Puma RS-X",
      image: "/product/zapato3.svg",
      price: 99.99,
      category: "Casual",
      inventory: 28,
      sales: 76,
    },
    {
      id: "4",
      name: "Reebok Classic",
      image: "/product/zapato4.svg",
      price: 89.99,
      category: "Casual",
      inventory: 53,
      sales: 112,
    },
  ]);

  // Mock data for customers
  const [customers, setCustomers] = useState([
    {
      id: "1",
      name: "Carlos Pérez",
      email: "carlos@example.com",
      avatar: "/user/avatar1.svg",
      totalPurchases: 4,
      totalSpent: 437.96,
      lastPurchase: "2025-04-02",
    },
    {
      id: "2",
      name: "María González",
      email: "maria@example.com",
      avatar: "/user/avatar2.svg",
      totalPurchases: 7,
      totalSpent: 856.43,
      lastPurchase: "2025-04-05",
    },
    {
      id: "3",
      name: "Juan Rodríguez",
      email: "juan@example.com",
      avatar: "/user/avatar3.svg",
      totalPurchases: 2,
      totalSpent: 249.98,
      lastPurchase: "2025-03-28",
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@example.com",
      avatar: "/user/avatar4.svg",
      totalPurchases: 5,
      totalSpent: 623.95,
      lastPurchase: "2025-04-01",
    },
    {
      id: "5",
      name: "Luis Torres",
      email: "luis@example.com",
      avatar: "/user/avatar5.svg",
      totalPurchases: 3,
      totalSpent: 347.97,
      lastPurchase: "2025-03-25",
    },
  ]);

  // Statistics data
  const stats = {
    totalSales: 8975.42,
    totalProducts: products.length,
    totalCustomers: customers.length,
    averageRating: 4.7,
  };

  // Handler for form input changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handler for form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newId =
      products.length > 0
        ? (Math.max(...products.map((p) => parseInt(p.id))) + 1).toString()
        : "1";
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      inventory: parseInt(newProduct.inventory),
      image: "/product/zapato.svg", // Default image
      sales: 0,
    };

    setProducts([...products, productToAdd]);
    console.log("Product added:", setCustomers);
    // Reset form
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      inventory: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#4A69E2] to-[#5A79F2] rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div
            style={{ fontFamily: "Righteous" }}
            className="text-white mb-4 md:mb-0"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">
              Panel de Vendedor
            </h1>
            <p className="opacity-90 text-sm sm:text-base">
              Gestiona tus productos y clientes
            </p>
          </div>

          <div className="flex gap-2 sm:gap-4 w-full md:w-auto">
            <button className="bg-white text-[#4A69E2] px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium hover:bg-opacity-90 transition text-sm sm:text-base">
              Exportar Datos
            </button>
            <button className="bg-[#FFA52F] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium hover:bg-opacity-90 transition text-sm sm:text-base">
              Configuración
            </button>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
            <p className="text-white opacity-80 text-xs sm:text-sm">
              Ventas Totales
            </p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              ${new Intl.NumberFormat("en-US").format(stats.totalSales)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
            <p className="text-white opacity-80 text-xs sm:text-sm">
              Productos
            </p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {stats.totalProducts}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
            <p className="text-white opacity-80 text-xs sm:text-sm">Clientes</p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {stats.totalCustomers}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
            <p className="text-white opacity-80 text-xs sm:text-sm">
              Valoración
            </p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {stats.averageRating}/5
            </p>
          </div>
        </div>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex overflow-x-auto mb-4 sm:mb-6 pb-2 hide-scrollbar">
        <div className="flex border-b min-w-max">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base ${
              activeTab === "products"
                ? "text-[#4A69E2] border-b-2 border-[#4A69E2]"
                : "text-gray-500"
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base ${
              activeTab === "customers"
                ? "text-[#4A69E2] border-b-2 border-[#4A69E2]"
                : "text-gray-500"
            }`}
          >
            Clientes
          </button>
          <button
            onClick={() => setActiveTab("new-product")}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base ${
              activeTab === "new-product"
                ? "text-[#4A69E2] border-b-2 border-[#4A69E2]"
                : "text-gray-500"
            }`}
          >
            Crear Producto
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="pb-8 sm:pb-12">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Header section - responsive design */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              {/* Title - Full width on mobile, auto width on larger screens */}
              <h2
                style={{ fontFamily: "Righteous" }}
                className="text-xl sm:text-2xl font-bold text-gray-800"
              >
                Todos Los Productos
              </h2>

              {/* Controls container - Mobile: Full width with toggle / Desktop: Always visible */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Mobile filter toggle button */}
                <button
                  className="sm:hidden flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 4a1 1 0 011-1h6a1 1 0 010 2h-6a1 1 0 01-1-1zm1 4a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z"
                      />
                    </svg>
                    Filtrar y ordenar
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isFilterOpen ? "rotate-180" : ""
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

                {/* Filter controls - Collapsible on mobile, always visible on desktop */}
                <div
                  className={`flex flex-col sm:flex-row gap-3 ${
                    isFilterOpen ? "block" : "hidden sm:flex"
                  }`}
                >
                  <select className="border rounded-lg px-3 py-2 text-gray-700 bg-white">
                    <option>Todos los productos</option>
                    <option>Sneakers</option>
                    <option>Running</option>
                    <option>Casual</option>
                  </select>
                  <button className="bg-[#FFA52F] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                    Ordenar
                  </button>
                </div>
              </div>
            </div>

            {/* Products list */}
            <DashBoardList
              products={products.map((product) => ({
                ...product,
                id: String(product.id),
              }))}
            />
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h2
                style={{ fontFamily: "Righteous" }}
                className="text-xl sm:text-2xl font-bold text-gray-800"
              >
                Tus Clientes
              </h2>
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar cliente"
                  className="border rounded-lg px-3 py-1 sm:py-2 text-gray-700 text-sm sm:text-base w-full"
                />
              </div>
            </div>

            <CustomerList customers={customers} />
          </div>
        )}

        {/* Create Product Tab */}
        {activeTab === "new-product" && (
          <div>
            <h2
              style={{ fontFamily: "Righteous" }}
              className="text-xl sm:text-2xl font-bold  text-gray-800 mb-4 sm:mb-6"
            >
              Crear Nuevo Producto
            </h2>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent text-sm sm:text-base"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Running">Running</option>
                      <option value="Casual">Casual</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Training">Training</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inventario
                    </label>
                    <input
                      type="number"
                      name="inventory"
                      value={newProduct.inventory}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A69E2] focus:border-transparent text-sm sm:text-base"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="px-4 sm:px-6 py-1 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-1 sm:py-2 bg-[#4A69E2] text-white rounded-lg hover:bg-[#3A59D2] text-sm sm:text-base"
                  >
                    Crear Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
