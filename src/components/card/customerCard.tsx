
interface Customer {
  id: string;
  name: string;
  email: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
}

export const CustomerCard = ({ customer }: { customer: Customer }) => (
  <div className="bg-white w-80 rounded-xl shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">
            {customer.name.charAt(0)}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">
            {customer.name}
          </h3>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Compras</p>
            <p className="text-lg font-medium">{customer.totalPurchases}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Gastado</p>
            <p className="text-lg font-medium">
              ${customer.totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Última compra: {customer.lastPurchase}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-[#4A69E2] hover:text-[#3A59D2] text-sm">
          Ver detalles
        </button>
      </div>
    </div>
  </div>
);
