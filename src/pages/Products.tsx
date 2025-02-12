import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import InputMask from "react-input-mask";
import { Tab } from '@headlessui/react';
import { Product } from "../types";

export default function Products() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
   const [selectedProduct, setSelectedProduct] =
      useState<Product | null>(null);

  const products = [
    {
      id: '1',
      name: 'Chocolate Cookies',
      category: 'Cookies',
      price: 4.99,
      stock: 1200,
      unit: 'units',
    },
    {
      id: '2',
      name: 'Vanilla Ice Cream',
      category: 'Ice Cream',
      price: 6.99,
      stock: 500,
      unit: 'units',
    },
  ];

    const handleAddProduct = () => {
      setSelectedProduct(null);
      setShowModal(true);
    };
  
    const handleEditProduct = (product: any) => {
      setSelectedProduct(product);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedProduct(null);
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      handleCloseModal();
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('products.title')}
        </h1>
        <button 
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('products.addProduct')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4">{t('products.name')}</th>
                <th className="text-left p-4">{t('products.category')}</th>
                <th className="text-left p-4">{t('products.price')}</th>
                <th className="text-left p-4">{t('products.stock')}</th>
                <th className="text-left p-4">{t('products.unit')}</th>
                <th className="text-left p-4">{t('products.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b dark:border-gray-700">
                  <td className="p-4 dark:text-white">{product.name}</td>
                  <td className="p-4 dark:text-white">{product.category}</td>
                  <td className="p-4 dark:text-white">R$ {product.price}</td>
                  <td className="p-4 dark:text-white">{product.stock}</td>
                  <td className="p-4 dark:text-white">{product.unit}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                        onClick={() => handleEditProduct(product)}
                      >
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

      {showModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedProduct ? t("hr.editEmployee") : t("hr.addEmployee")}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                        ${selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }`
                      }
                    >
                      {t("hr.personalInfo")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                        ${selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }`
                      }
                    >
                      {t("hr.contactInfo")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                        ${selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }`
                      }
                    >
                      {t("hr.employmentInfo")}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel
                      className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800"
                    >
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.fullName")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.birthDate")} *
                            </label>
                            <input
                              type="date"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.cpf")} *
                            </label>
                            <InputMask
                              mask="999.999.999-99"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.rg")} *
                            </label>
                            <InputMask
                              mask="99.999.999-9"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.gender")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="male">{t("hr.male")}</option>
                              <option value="female">{t("hr.female")}</option>
                              <option value="other">{t("hr.other")}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                    className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800"
                      >
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("auth.email")} *
                            </label>
{/*                             <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              title="Digite um e-mail válido (exemplo@dominio.com)"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            /> */}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.phone")} *
                            </label>
                            <input
                              type="tel"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.street")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.number")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.complement")}
                            </label>
                            <input
                              type="text"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.neighborhood")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.city")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.state")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.zipCode")} *
                            </label>
                            <InputMask
                              mask="99999-999"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                        className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800"
                    >
                      {/* Employment Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.position")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.department")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.startDate")} *
                            </label>
                            <input
                              type="date"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.salary")} *
                            </label>
                            <input
                              type="number"
                              required
                              step="0.01"
                              min="0"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.status")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="active">{t("hr.active")}</option>
                              <option value="inactive">{t("hr.inactive")}</option>
                              <option value="on_leave">{t("hr.onLeave")}</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.accessLevel")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="admin">{t("hr.admin")}</option>
                              <option value="manager">{t("hr.manager")}</option>
                              <option value="employee">{t("hr.employee")}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedProduct ? t("hr.editEmployee") : t("hr.addEmployee")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}