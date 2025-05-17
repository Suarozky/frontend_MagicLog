import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getCartItems, deleteCartItem } from "../../api/cart-items";
import type { CartProduct } from "../../types/cart-item";
import { hasAccessTokenCookie } from "../../utils/verifyLogin";

const PrincipalNavbar = () => {
  const location = useLocation();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);
  const toggleCartDropdown = () => setCartDropdownOpen(!cartDropdownOpen);
  const isActive = (path: string) => location.pathname === path;

  // Load cart items function
  const loadCartItems = async () => {
    try {
      setLoadingCart(true);
      const items = await getCartItems();
      setCartItems(items);

      // Calculate total items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const total = items.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sum: any, item: { quantity: any }) => sum + item.quantity,
        0
      );
      setCartTotal(total);
    } catch (error) {
      console.error("Error loading cart items:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const logout = () => {
    // Clear the access token cookie
    document.cookie.split("; ").forEach((cookie) => {
      if (cookie.startsWith("access_token=")) {
        document.cookie = `${cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
    // Redirect to the login page
    window.location.href = "/auth";
  };

  const handleDeleteCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      // Reload cart items after deletion
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      const total = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartTotal(total);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Load cart items when dropdown opens
  useEffect(() => {
    if (cartDropdownOpen) {
      loadCartItems();
    }
  }, [cartDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black">
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">MS</span>
          </div>
          <span className="ml-2 text-xl font-bold text-blue-600">MyShop</span>
        </div>

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileDropdown}
            aria-expanded={mobileDropdownOpen}
            aria-label="Toggle menu"
          >
            {mobileDropdownOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación principal (pantallas medianas en adelante) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`py-1 px-2 font-medium ${
              isActive("/")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`py-1 px-2 font-medium ${
              isActive("/products")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Products
          </Link>
          <Link
            to="/store"
            className={`py-1 px-2 font-medium ${
              isActive("/store")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Store
          </Link>
          <Link
            to="/contact"
            className={`py-1 px-2 font-medium ${
              isActive("/contact")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Carrito y botón */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <div className="relative">
            <button
              className="flex items-center space-x-1  bg-white "
              onClick={toggleCartDropdown}
              aria-expanded={cartDropdownOpen}
              aria-label="Shopping cart"
            >
              <div className="rounded-full bg-blue-700 h-8 w-8 flex items-center justify-center">
                <ShoppingCart size={16} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-green-700 rounded-full flex items-center justify-center text-white text-xs">
                {cartTotal}
              </span>
              {cartDropdownOpen ? (
                <ChevronUp className="ml-1 text-gray-600" size={16} />
              ) : (
                <ChevronDown className="ml-1 text-gray-600" size={16} />
              )}
            </button>

            {/* Dropdown del carrito */}
            {cartDropdownOpen && (
              <div className="absolute top-full right-0 mt-2  w-96  bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Tu Carrito</h3>

                  {loadingCart ? (
                    <div className="flex justify-center h-full py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : cartItems.length > 0 ? (
                    <>
                      <div className="h-40 overflow-y-auto ">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center py-2 border-b border-gray-100 relative group"
                          >
                            {/* Botón de eliminar */}
                            <button
                              onClick={() => handleDeleteCartItem(item.id)}
                              className="absolute left-[305px] top-12 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 size={12} />
                            </button>

                            <img
                              src={
                                item.product.image ||
                                "https://via.placeholder.com/50"
                              }
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} × $
                                {parseFloat(item.product.price).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm font-bold mr-5">
                              $
                              {(
                                item.quantity * parseFloat(item.product.price)
                              ).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>
                            $
                            {cartItems
                              .reduce(
                                (total, item) =>
                                  total +
                                  item.quantity *
                                    parseFloat(item.product.price),
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 py-4 text-center">
                      Tu carrito está vacío
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="bg-blue-600 text-white hover:bg-blue-700  py-2 px-4 rounded-md font-medium transition-colors">
            {hasAccessTokenCookie() ? (
              <Link to="/dashboard">Profile</Link>
            ) : (
              <Link to="/auth">Sign in</Link>
            )}
          </button>
          <button
            className="bg-blue-600 text-white hover:bg-blue-700  py-2 px-4 rounded-md font-medium transition-colors"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {mobileDropdownOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-start px-4 py-2 space-y-2">
            <Link
              to="/"
              onClick={toggleMobileDropdown}
              className={`block font-medium py-1 ${
                isActive("/") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={toggleMobileDropdown}
              className={`block font-medium py-1 ${
                isActive("/products") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Products
            </Link>
            <Link
              to="/store"
              onClick={toggleMobileDropdown}
              className={`block font-medium py-1 ${
                isActive("/store") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Store
            </Link>
            <Link
              to="/contact"
              onClick={toggleMobileDropdown}
              className={`block font-medium py-1 ${
                isActive("/contact") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Contact
            </Link>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-200 w-full">
              {/* Mobile Cart Button */}
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-gray-700"
              >
                <div className="relative">
                  <div className="rounded-full bg-blue-700 h-8 w-8 flex items-center justify-center">
                    <ShoppingCart size={16} className="text-white" />
                  </div>
                  <span className="absolute top-32 -right-44 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {cartTotal}
                  </span>
                </div>
                <span className="font-medium">Ver carrito</span>
              </Link>

              {/* Mobile Sign In Button */}
              <Link
                to="/auth"
                onClick={toggleMobileDropdown}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PrincipalNavbar;
