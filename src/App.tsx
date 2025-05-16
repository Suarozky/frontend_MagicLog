import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/homeView";
import StoreView from "./views/storeView";
import MainLayout from "./layout/mainLayout";
import ProductView from "./views/productView.tsx";
import SellerView from "./views/sellerView.tsx";
import AdminView from "./views/adminView.tsx";
import AuthView from "./views/authView.tsx";

function App() {
  return (
    <Router>
      <div className="w-full flex">
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/store" element={<StoreView />} />
            <Route path="/products" element={<ProductView />} />
            <Route path="/seller" element={<SellerView />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/auth" element={<AuthView />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
