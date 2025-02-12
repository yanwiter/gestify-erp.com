import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Quality() {
  const { t } = useTranslation();

  const inspections = [
    {
      id: 'QC-2024-001',
      batchNumber: 'BATCH-001',
      temperature: 22.5,
      humidity: 45,
      ph: 6.8,
      inspector: 'John Doe',
      status: 'approved',
      notes: 'All parameters within acceptable range',
    },
    {
      id: 'QC-2024-002',
      batchNumber: 'BATCH-002',
      temperature: 23.1,
      humidity: 48,
      ph: 7.2,
      inspector: 'Jane Smith',
      status: 'rejected',
      notes: 'pH levels above acceptable range',
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('quality.title')}
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('quality.addInspection')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4">{t('quality.batchNumber')}</th>
                <th className="text-left p-4">{t('quality.temperature')}</th>
                <th className="text-left p-4">{t('quality.humidity')}</th>
                <th className="text-left p-4">{t('quality.ph')}</th>
                <th className="text-left p-4">{t('quality.inspector')}</th>
                <th className="text-left p-4">{t('quality.status')}</th>
                <th className="text-left p-4">{t('quality.notes')}</th>
                <th className="text-left p-4">{t('products.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="border-b dark:border-gray-700">
                  <td className="p-4 dark:text-white">{inspection.batchNumber}</td>
                  <td className="p-4 dark:text-white">{inspection.temperature}°C</td>
                  <td className="p-4 dark:text-white">{inspection.humidity}%</td>
                  <td className="p-4 dark:text-white">{inspection.ph}</td>
                  <td className="p-4 dark:text-white">{inspection.inspector}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(inspection.status)}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td className="p-4 dark:text-white">{inspection.notes}</td>
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