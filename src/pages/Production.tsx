import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Production() {
  const { t } = useTranslation();

  const orders = [
    {
      id: 'PO-2024-001',
      product: 'Chocolate Cookies',
      quantity: 5000,
      status: 'in-progress',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
    },
    {
      id: 'PO-2024-002',
      product: 'Vanilla Ice Cream',
      quantity: 2000,
      status: 'completed',
      startDate: '2024-03-08',
      endDate: '2024-03-09',
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('production.title')}
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('production.addOrder')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4">{t('production.orderId')}</th>
                <th className="text-left p-4">{t('production.product')}</th>
                <th className="text-left p-4">{t('production.quantity')}</th>
                <th className="text-left p-4">{t('production.status')}</th>
                <th className="text-left p-4">{t('production.startDate')}</th>
                <th className="text-left p-4">{t('production.endDate')}</th>
                <th className="text-left p-4">{t('products.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b dark:border-gray-700">
                  <td className="p-4 dark:text-white">{order.id}</td>
                  <td className="p-4 dark:text-white">{order.product}</td>
                  <td className="p-4 dark:text-white">{order.quantity}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 dark:text-white">{order.startDate}</td>
                  <td className="p-4 dark:text-white">{order.endDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}