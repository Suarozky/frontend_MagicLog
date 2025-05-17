"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiChevronLeft,
  FiShoppingCart,
  FiCreditCard,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { getProductById } from "../api/products";
import type { Product } from "../types/products";

export default function ProductView() {
  const [product, setProduct] = useState<Product | null>(null);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) return;
        const response = await getProductById(productId);
        setProduct(response);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // For demo purposes - multiple product images
  const productImages = product?.image
    ? [
        product.image,
        "https://picsum.photos/id/26/800/800",
        "https://picsum.photos/id/43/800/800",
      ]
    : [];

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </a>
            </li>
            <li className="text-gray-400">
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="/store" className="text-gray-500 hover:text-gray-700">
                Store
              </a>
            </li>
            <li className="text-gray-400">
              <span className="mx-2">/</span>
            </li>
            <li className="text-blue-600 font-medium">
              {isLoading ? "Loading..." : product?.name}
            </li>
          </ol>
        </nav>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : product ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
              {/* Product Images - Column 1 (Small thumbnails) */}
              <div className="hidden lg:flex flex-col items-center gap-4 py-8 px-4 bg-gray-50 border-r border-gray-100">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-600 shadow-md"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Product Main Image - Column 2 */}
              <motion.div
                className="lg:col-span-2 bg-white p-6 flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FiHeart className="text-gray-500" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <FiShare2 className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Thumbnails (visible only on mobile/tablet) */}
              <div className="lg:hidden flex justify-center gap-2 py-4 px-6 bg-white border-t border-gray-100">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-md overflow-hidden cursor-pointer border transition-all ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Product Details - Column 3 */}
              <motion.div
                className="lg:col-span-2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-100"
                initial="hidden"
                animate="visible"
                variants={slideUp}
              >
                {/* Product Header */}
                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      In Stock
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      SKU: {product.sku}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      4.8 (42 reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Sold by</span>
                    <a href="#" className="ml-1 text-blue-600 hover:underline">
                      {product.user?.email}
                    </a>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      20% Off
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Price includes taxes & shipping
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 my-6"></div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center border border-r-0 border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12H19"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 h-10 text-center border-y border-gray-300 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center border border-l-0 border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="ml-3 text-sm text-gray-500">
                      {product.quantity} available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCreditCard className="text-white" />
                    <span>Buy Now</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="py-3 px-6 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="text-blue-600" />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>

                
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-500 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/store"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <FiChevronLeft className="mr-2" />
              Back to Store
            </a>
          </div>
        )}   
      </div>
    </div>
  );
}
