// components/VendorDashboard.tsx
"use client";

import { useState } from "react";
import { CustomerList } from "../components/list/customerList";
import { DashBoardList } from "../components/list/dashboardList";

export default function AdminView() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("products");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for product form

  // Mock data for products
  const [products] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      image: "/product/zapato.svg",
      price: 129.99,
      category: "Sneakers",
      inventory: 45,
      sales: 127,
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      image: "/product/zapato2.svg",
      price: 149.99,
      category: "Running",
      inventory: 32,
      sales: 98,
    },
    {
      id: 3,
      name: "Puma RS-X",
      image: "/product/zapato3.svg",
      price: 99.99,
      category: "Casual",
      inventory: 28,
      sales: 76,
    },
    {
      id: 4,
      name: "Reebok Classic",
      image: "/product/zapato4.svg",
      price: 89.99,
      category: "Casual",
      inventory: 53,
      sales: 112,
    },
  ]);

  const [customers] = useState([
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#4A69E2] to-[#5A79F2] rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div
            style={{ fontFamily: "Righteous" }}
            className="text-white mb-4 md:mb-0"
          >
            <h1 className="text-3xl font-bold">Panel de Administrador</h1>
            <p className="opacity-90">Gestiona productos y clientes</p>
          </div>

          <div className="flex gap-4">
            <button className="bg-white text-[#4A69E2] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
              Exportar Datos
            </button>
            <button className="bg-[#FFA52F] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
              Configuración
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white opacity-80">Ventas Totales</p>
            <p className="text-2xl font-bold text-white">
              ${new Intl.NumberFormat("en-US").format(stats.totalSales)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white opacity-80">Productos</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalProducts}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white opacity-80">Clientes</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalCustomers}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white opacity-80">Valoración</p>
            <p className="text-2xl font-bold text-white">
              {stats.averageRating}/5
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 font-medium ${
            activeTab === "products"
              ? "text-[#4A69E2] border-b-2 border-[#4A69E2]"
              : "text-gray-500"
          }`}
        >
          Productos
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={`px-6 py-3 font-medium ${
            activeTab === "customers"
              ? "text-[#4A69E2] border-b-2 border-[#4A69E2]"
              : "text-gray-500"
          }`}
        >
          Clientes
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="pb-12">
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
            <div className="flex justify-between items-center mb-6">
              <h2
                style={{ fontFamily: "Righteous" }}
                className="text-2xl font-bold text-gray-800"
              >
                Todos Los Clientes
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar cliente"
                  className="border rounded-lg px-3 py-2 text-gray-700"
                />
              </div>
            </div>

            <CustomerList customers={customers} />
          </div>
        )}
      </div>
    </div>
  );
}
