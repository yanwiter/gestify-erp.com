import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { SupplierModel } from "../types";
import InputMask from "react-input-mask";
import { Tab } from "@headlessui/react";

export default function Suppliers() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierModel | null>(null);
  const [email, setEmail] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [mask, setMask] = useState("");

  useEffect(() => {
    setMask(typePerson === "physicalEntity" ? "99.999.999/9999-99" : "999.999.999-99" );
  }, [typePerson]);


  const handleChange = (tipo) => {
    setTypePerson(tipo === typePerson ? "" : tipo);
  };

  const suppliers = [
    {
      id: "1",
      name: "Sugar Supply Co.",
      cnpj: "12.345.678/0001-90",
      email: "contact@sugarsupply.com",
      phone: "(11) 1234-5678",
      address: "Av. Industrial, 1000",
    },
    {
      id: "2",
      name: "Flour Mills Ltd.",
      cnpj: "98.765.432/0001-10",
      email: "sales@flourmills.com",
      phone: "(11) 9876-5432",
      address: "Rua dos Moinhos, 500",
    },
  ];

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setShowModal(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("suppliers.title")}
        </h1>
        <button
          onClick={handleAddSupplier}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t("suppliers.addSupplier")}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4">{t("suppliers.name")}</th>
                <th className="text-left p-4">{t("suppliers.cnpj")}</th>
                <th className="text-left p-4">{t("suppliers.email")}</th>
                <th className="text-left p-4">{t("suppliers.phone")}</th>
                <th className="text-left p-4">{t("suppliers.address")}</th>
                <th className="text-left p-4">{t("products.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b dark:border-gray-700">
                  <td className="p-4 dark:text-white">{supplier.name}</td>
                  <td className="p-4 dark:text-white">{supplier.cnpj}</td>
                  <td className="p-4 dark:text-white">{supplier.email}</td>
                  <td className="p-4 dark:text-white">{supplier.phone}</td>
                  <td className="p-4 dark:text-white">{supplier.address}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                      >
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedSupplier
                    ? t("suppliers.editSupplier")
                    : t("suppliers.addSupplier")}
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
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.supplierIdentification")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.address")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.documentation")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.contact")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.bankInformation")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("suppliers.otherInformation")}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {/* Identificação do Fornecedor */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {typePerson === "physicalEntity"
                                ? t("suppliers.name")
                                : t("suppliers.fantasyName")}{" "}
                              *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.typePerson")} *
                            </label>
                            <div className="mt-2 flex gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={typePerson === "physicalEntity"}
                                  onChange={() => handleChange("physicalEntity")}
                                  className="form-checkbox h-4 w-4 border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {t("suppliers.physicalEntity")}
                                </span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={typePerson === "juridica"}
                                  onChange={() => handleChange("juridica")}
                                  className="form-checkbox h-4 w-4 border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {t("suppliers.legalEntity")}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    {/* Endereço */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>
                      </div>
                    </Tab.Panel>
                    {/* Documentação */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {typePerson === "physicalEntity"
                                  ? t("suppliers.cnpj")
                                  : t("suppliers.cpf")}{" "}
                                *
                              </label>
                              <InputMask
                                mask={mask}
                                maskChar={null}
                                type="text"
                                required
                                className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.stateRegistration")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.municipalRegistration")}
                            </label>
                            <input
                              type="text"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        
                      </div>
                    </Tab.Panel>
                    {/* Contato */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("auth.email")} *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              title="Digite um e-mail válido (exemplo@dominio.com)"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
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
                      </div>
                    </Tab.Panel>
                    {/* Informações Bancárias */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.status")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="active">{t("hr.active")}</option>
                              <option value="inactive">
                                {t("hr.inactive")}
                              </option>
                              <option value="on_leave">
                                {t("hr.onLeave")}
                              </option>
                            </select>
                          </div>

                        </div>
                      </div>
                    </Tab.Panel>
                    {/* Outras Informações */}
                    <Tab.Panel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.status")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="active">{t("hr.active")}</option>
                              <option value="inactive">
                                {t("hr.inactive")}
                              </option>
                              <option value="on_leave">
                                {t("hr.onLeave")}
                              </option>
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
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedSupplier
                      ? t("suppliers.editSupplier")
                      : t("suppliers.addSupplier")}
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
