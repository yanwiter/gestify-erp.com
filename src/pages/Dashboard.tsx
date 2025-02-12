import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Package, Truck, Factory } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.totalProducts')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">1,234</h3>
            </div>
            <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.activeSuppliers')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">56</h3>
            </div>
            <Truck className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.productionOrders')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">89</h3>
            </div>
            <Factory className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.monthlyRevenue')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">R$ 543.2K</h3>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t('dashboard.recentOrders')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('production.orderId')}</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('production.product')}</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('production.status')}</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('production.quantity')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-800 dark:text-gray-200">PO-2024-001</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">Chocolate Cookies</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm">
                      In Progress
                    </span>
                  </td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">5,000 units</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-800 dark:text-gray-200">PO-2024-002</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">Vanilla Ice Cream</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                      Completed
                    </span>
                  </td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">2,000 units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t('dashboard.lowStock')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('products.name')}</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">Current Stock</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">Min. Stock</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t('production.status')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-800 dark:text-gray-200">Sugar</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">100 kg</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">500 kg</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-sm">
                      Critical
                    </span>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-800 dark:text-gray-200">Flour</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">300 kg</td>
                  <td className="py-2 text-gray-800 dark:text-gray-200">400 kg</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm">
                      Warning
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}