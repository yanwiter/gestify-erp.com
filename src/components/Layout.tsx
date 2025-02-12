import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Home,
  Package,
  Truck,
  Factory,
  ClipboardCheck,
  BarChart,
  Settings,
  Sun,
  Moon,
  Languages,
  ChevronLeft,
  LogOut,
  Users,
  ChevronDown,
  UserPlus,
  GraduationCap,
  CalendarDays,
  DollarSign,
  ShoppingCart,
  CircleDollarSign,
  Bell,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabaseClient";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHRExpanded, setIsHRExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
  const [isPurchasingExpanded, setIsPurchasingExpanded] = useState(false);
  const [isRevenueExpanded, setIsRevenueExpanded] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(5);
  const user = "Yan Witer";

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pt" : "en");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-800 shadow-md transition-all duration-300`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Factory className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Gestify
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Home className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.dashboard")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/products")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Package className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.products")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/suppliers"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/suppliers")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Truck className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.suppliers")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/production"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/production")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Factory className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.production")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/quality"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/quality")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <ClipboardCheck className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.quality")}</span>}
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => !isCollapsed && setIsHRExpanded(!isHRExpanded)}
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/hr")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.hr")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isHRExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isHRExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/hr/employee"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/employee")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{t("hr.employees")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/training"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/training")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{t("hr.training")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/timetracking"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/timetracking")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>{t("hr.timeTracking")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/payroll"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/payroll")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{t("hr.payroll")}</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsReportsExpanded(!isReportsExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/reports")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.reports")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isReportsExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isReportsExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsPurchasingExpanded(!isPurchasingExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/purchasing")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.purchasing")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isPurchasingExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isPurchasingExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsRevenueExpanded(!isRevenueExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/revenue")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.revenue")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isRevenueExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isRevenueExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/settings"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/settings")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.settings")}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 dark:text-white" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {user
                  ? `${t("common.greeting")}, ${user || "Usuário"}!`
                  : t("common.greeting")}
              </span>
              <button
                onClick={changeLanguage}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={t("common.language")}
              >
                <Languages className="w-5 h-5 dark:text-white" />
              </button>
              <button
                onClick={() => console.log("Notificações clicadas")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                title={t("common.notifications")}
              >
                <Bell className="w-5 h-5 dark:text-white" />
                {notificationsCount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notificationsCount}
                  </div>
                )}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={t("common.darkMode")}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5 text-white" />
                )}
              </button>
              <div className="relative group">
                <button 
                  className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("auth.logout")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
