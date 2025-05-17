"use client";

import { useState, useEffect } from "react";
import { DashBoardList } from "../components/list/dashboardList";
import { Profile } from "../api/auth";
import {
  getProductsByUserId,
  createProduct,
  getProducts,
} from "../api/products";
import type { Product, ProfileType } from "../types/products";
import { faker } from "@faker-js/faker";
import { RedirectByRole } from "../utils/decodeToken";

export default function SellerView() {
  const [activeTab, setActiveTab] = useState("products");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    id: "",
    name: "",
    email: "",
    image: "",
    role: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect based on user role
  RedirectByRole();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    price: 0,
    quantity: 0,
    image: faker.image.urlPicsumPhotos(),
  });

  useEffect(() => {
    const fetchProfileAndProducts = async () => {
      try {
        setLoading(true);
        const profileResponse = await Profile();

        if (!profileResponse?.id) {
          throw new Error("Could not retrieve profile information");
        }

        // Update profile state
        setProfile({
          id: profileResponse.id.toString(),
          name: profileResponse.name || "",
          email: profileResponse.email,
          image: profileResponse.image,
          role: profileResponse.role.id,
        });

        // Get products based on role
        const response =
          profileResponse.role.name === "Admin"
            ? await getProducts()
            : await getProductsByUserId(profileResponse.id);

        // Handle both response formats
        let productsArray: Product[] = [];

        if (Array.isArray(response)) {
          // For Seller: direct array response
          productsArray = response;
        } else if (response?.products && Array.isArray(response.products)) {
          // For Admin: response with {products, metadata} structure
          productsArray = response.products;
        } else {
          console.warn("Unrecognized response format:", response);
        }

        setProducts(productsArray);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndProducts();
  }, []);

  // Statistics data
  const stats = {
    totalSales: 8975.42,
    totalProducts: products.length,
    averageRating: 4.7,
    totalCustomers: 253,
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const createdProduct = await createProduct(productForm);

      if (createdProduct) {
        // Update products list
        setProducts([...products, createdProduct]);

        // Reset form
        setProductForm({
          name: "",
          sku: "",
          price: 0,
          quantity: 0,
          image: "https://loremflickr.com/",
        });

        // Switch to products tab
        setActiveTab("products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {profile.role === 2 ? "Seller Dashboard" : "Admin Dashboard"}
              </h1>
              <p className="text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Sales
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 8C15 8 13.5 10 12 10C10.5 10 9 8 9 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 16L9.01 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 16L15.01 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  ${new Intl.NumberFormat("en-US").format(stats.totalSales)}
                </span>
                <span className="text-sm text-green-500 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +8.2% from last week
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">Products</h3>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7L12 3L4 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 7V17L12 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7V17L12 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11L12 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3L12 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </span>
                <span className="text-sm text-green-500 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +4 new this month
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">
                  Average Rating
                </h3>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.averageRating}
                </span>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(stats.averageRating)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    from 48 reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Customers
                </h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </span>
                <span className="text-sm text-green-500 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L12 8L17 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +12% from last month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 ">
          <div className="px-6 border-b border-gray-100">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-4 font-medium text-sm mt-5 ${
                  activeTab === "products"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Products
              </button>
              {profile.role === 2 && (
                <button
                  onClick={() => setActiveTab("new-product")}
                  className={`px-6 py-4 ml-4 font-medium text-sm mt-5 ${
                    activeTab === "new-product"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  New Product
                </button>
              )}
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="p-6">
            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                {/* Header section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile.role === 2 ? "Your Products" : "All Products"}
                  </h2>

                  {/* Controls container */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Mobile filter toggle button */}
                    <button
                      className="sm:hidden flex items-center justify-between w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-700 border border-gray-200"
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
                            d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6h12m-12 6h12"
                          />
                        </svg>
                        Filter & Sort
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
                  </div>
                </div>

                {/* Products list with loading state */}
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : products.length > 0 ? (
                  <DashBoardList
                    products={products.map((product) => ({
                      ...product,
                      id: product.id,
                      name: product.name,
                      sku: product.sku,
                      quantity: product.quantity,
                      price: product.price,
                      createdAt: product.createdAt,
                      user: {
                        id: product.user.id,
                        email: product.user.email,
                      },
                    }))}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-gray-50 p-6 rounded-full">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7L12 3L4 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 7V17L12 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7V17L12 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 11L12 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 3L12 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No products available
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Get started by creating your first product
                    </p>
                    <button
                      onClick={() => setActiveTab("new-product")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Create Product
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Create Product Tab */}
            {activeTab === "new-product" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Create New Product
                </h2>

                <div className="bg-white rounded-xl">
                  <form onSubmit={handleCreateProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g. Premium Wireless Headphones"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SKU
                        </label>
                        <input
                          type="text"
                          name="sku"
                          value={productForm.sku}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              sku: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g. WH-X1000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: Number(e.target.value),
                            })
                          }
                          step="0.01"
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g. 99.99"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Inventory Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={productForm.quantity}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              quantity: Number(e.target.value),
                            })
                          }
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g. 50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={productForm.image}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              image: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. https://example.com/image.jpg"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Enter a valid image URL or leave default for a
                          placeholder image
                        </p>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Product Preview
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-1/3">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={
                                productForm.image || "/placeholder-product.jpg"
                              }
                              alt="Product preview"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="w-full sm:w-2/3">
                          <h4 className="text-xl font-medium text-gray-900">
                            {productForm.name || "Product Name"}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            SKU: {productForm.sku || "SKU-00000"}
                          </p>
                          <div className="mt-2 text-xl font-bold text-gray-900">
                            ${productForm.price.toFixed(2)}
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">In Stock:</span>{" "}
                            {productForm.quantity}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab("products")}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating...
                          </span>
                        ) : (
                          "Create Product"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
