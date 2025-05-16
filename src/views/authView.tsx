// AuthView.js
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthView } from "../store/authSlice";
import type { RootState } from "../store/store";

export default function AuthView() {
  const isRegisterView = useSelector(
    (state: RootState) => state.auth.isRegisterView
  );
  const dispatch = useDispatch();

  const toggleView = () => {
    dispatch(toggleAuthView());
  };

  return (
    <div className="flex justify-center rounded-xl items-center  p-6 bg-gray-50">
      <div
        className={`flex flex-col ${
          isRegisterView ? "md:flex-row" : "md:flex-row-reverse"
        } w-full max-w-6xl gap-8`}
      >
        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 h-[500px] md:h-auto overflow-hidden rounded-xl shadow-lg">
          <img
            src={
              isRegisterView
                ? "https://nft-sandy-five.vercel.app/ac.svg"
                : "https://nft-sandy-five.vercel.app/ac.svg"
            }
            className="h-full w-full object-cover"
            alt="Magiclog"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {isRegisterView ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
            {isRegisterView
              ? "Welcome! Enter your details and start creating, collecting and selling NFTs."
              : "Log in to access your account and continue your NFT journey."}
          </p>

          <form className="flex flex-col gap-5">
            {isRegisterView && (
              <>
                <select
                  className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select role</option>
                  <option value="customer">1. Customer</option>
                  <option value="seller">2. Seller</option>
                  <option value="admin">3. Admin</option>
                </select>
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {isRegisterView && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              {isRegisterView ? "Create Account" : "Log In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={toggleView}
              className="bg-white border-none text-blue-600 hover:text-blue-800 font-medium"
            >
              {isRegisterView
                ? "Already have an account? Log In"
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
