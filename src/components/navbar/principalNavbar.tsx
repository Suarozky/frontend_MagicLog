import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PrincipalNavbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
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
          <button onClick={toggleDropdown}>
            {dropdownOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación principal (pantallas medianas en adelante) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`py-1 px-2 font-medium ${
              isActive("/")
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`py-1 px-2 font-medium ${
              isActive("/products")
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Products
          </Link>
          <Link
            to="/store"
            className={`py-1 px-2 font-medium ${
              isActive("/store")
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Store
          </Link>
          <Link
            to="/contact"
            className={`py-1 px-2 font-medium ${
              isActive("/contact")
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Carrito y botón */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="relative flex items-center bg-white border-none justify-center">
            <div className="rounded-full bg-blue-700 h-8 w-8 flex items-center justify-center">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </span>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
            <Link
              to="/auth"
              onClick={toggleDropdown}
              className="text-white hover:text-blue-600"
            >
              sign in
            </Link>
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {dropdownOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-start px-4 py-2 space-y-2">
            <Link
              to="/"
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600"
            >
              Products
            </Link>
            <Link
              to="/store"
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600"
            >
              Store
            </Link>
            <Link
              to="/contact"
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>

            {/* Carrito y botón para móviles */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="relative flex items-center justify-center">
                <div className="rounded-full bg-blue-700 h-8 w-8 flex items-center justify-center">
                  <ShoppingCart size={16} className="text-white" />
                </div>
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  4
                </span>
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                <Link
                  to="/auth"
                  onClick={toggleDropdown}
                  className="text-white hover:text-blue-600"
                >
                  sign in
                </Link>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PrincipalNavbar;
