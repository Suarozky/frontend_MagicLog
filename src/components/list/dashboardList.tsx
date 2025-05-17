// components/ProductList.tsx
import DashboardCard from "../card/dashboardCard";
import type { Product } from "../../types/products";


export const DashBoardList = ({ products }: { products: Product[] }) => (
  <div className="bg-white rounded-xl shadow overflow-hidden p-2">
    <table className="p-2">
      <thead className="bg-gray-50"></thead>
      <tbody className="divide-y divide-gray-200">
        {products.map((product) => (
          <DashboardCard key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  </div>
);
