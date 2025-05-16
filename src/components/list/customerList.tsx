// components/CustomerList.tsx
import { CustomerCard } from "../../components/card/customerCard";

interface Customer {
  id: string;
  name: string;
  email: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
}

export const CustomerList = ({ customers }: { customers: Customer[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {customers.map((customer) => (
      <CustomerCard key={customer.id} customer={customer} />
    ))}
  </div>
);
