import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Settings } from 'lucide-react';
import { Notification, NotificationPreferences } from '../types';
import { notificationService } from '../lib/notificationClient';
import { useAuth } from '../hooks/useAuth';

export default function Notifications() {
  const { t } = useTranslation();
  const { user } = "yanwiter@gmail.com";
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nova Mensagem',
      message: 'Você recebeu uma nova mensagem de John Doe.',
      type: 'info',
      isRead: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Alerta de Segurança',
      message: 'Uma tentativa de login suspeita foi detectada.',
      type: 'alert',
      isRead: false,
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Atualização do Sistema',
      message: 'Uma nova atualização do sistema está disponível.',
      type: 'warning',
      isRead: true,
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const [notificationsData, preferencesData] = await Promise.all([
          notificationService.getNotifications(user.id),
          notificationService.getPreferences(user.id),
        ]);
        setNotifications(notificationsData);
        setPreferences(preferencesData);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadData();

    const unsubscribe = notificationService.subscribeToNotifications(
      user.id,
      (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    try {
      await notificationService.markAllAsRead(user.id);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleUpdatePreferences = async (updates: Partial<NotificationPreferences>) => {
    if (!user || !preferences) return;
    try {
      await notificationService.updatePreferences(user.id, updates);
      setPreferences((prev) => ({ ...prev!, ...updates }));
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleAddNotification = () => {
    const newNotification: Notification = {
      id: (notifications.length + 1).toString(),
      title: 'Nova Notificação',
      message: 'Esta é uma nova notificação simulada.',
      type: 'info',
      isRead: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedType === 'all') return true;
    if (selectedType === 'unread') return !notification.isRead;
    return notification.type === selectedType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('notifications.title')}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('notifications.markAllAsRead')}
          </button>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddNotification}
            className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            {t('notifications.addNotification')}
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">{t('notifications.filterAll')}</option>
          <option value="unread">{t('notifications.filterUnread')}</option>
          <option value="alert">{t('notifications.filterAlerts')}</option>
          <option value="warning">{t('notifications.filterWarnings')}</option>
          <option value="info">{t('notifications.filterInfo')}</option>
        </select>
      </div>

      {showPreferences && preferences && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {t('notifications.preferences')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t('notifications.emailNotifications')}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) =>
                    handleUpdatePreferences({
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('notifications.pushNotifications')}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications}
                  onChange={(e) =>
                    handleUpdatePreferences({
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${
              !notification.isRead
                ? 'border-l-4 border-blue-500'
                : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-full ${
                  notification.type === 'alert'
                    ? 'bg-red-100 text-red-600'
                    : notification.type === 'warning'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {notification.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  <span>•</span>
                  <span
                    className={`${
                      notification.priority === 'high'
                        ? 'text-red-500'
                        : notification.priority === 'medium'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {t(`notifications.priority.${notification.priority}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}