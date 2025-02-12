import { createClient } from '@supabase/supabase-js';
import { Notification, NotificationPreferences } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const notificationClient = createClient(supabaseUrl, supabaseAnonKey);

export class NotificationService {
  private static instance: NotificationService;
  private subscriptions: Map<string, () => void> = new Map();

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async getNotifications(userId: string, limit = 100): Promise<Notification[]> {
    const { data, error } = await notificationClient
      .from('notifications')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await notificationClient
      .from('notifications')
      .update({ isRead: true, updatedAt: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) throw error;
  }

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await notificationClient
      .from('notifications')
      .update({ isRead: true, updatedAt: new Date().toISOString() })
      .eq('userId', userId)
      .eq('isRead', false);

    if (error) throw error;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await notificationClient
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('userId', userId)
      .eq('isRead', false);

    if (error) throw error;
    return count || 0;
  }

  async getPreferences(userId: string): Promise<NotificationPreferences> {
    const { data, error } = await notificationClient
      .from('notification_preferences')
      .select('*')
      .eq('userId', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async updatePreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<void> {
    const { error } = await notificationClient
      .from('notification_preferences')
      .upsert({
        userId,
        ...preferences,
        updatedAt: new Date().toISOString(),
      });

    if (error) throw error;
  }

  subscribeToNotifications(userId: string, callback: (notification: Notification) => void): () => void {
    const subscription = notificationClient
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();

    const unsubscribe = () => {
      subscription.unsubscribe();
      this.subscriptions.delete(userId);
    };

    this.subscriptions.set(userId, unsubscribe);
    return unsubscribe;
  }

  unsubscribeFromNotifications(userId: string): void {
    const unsubscribe = this.subscriptions.get(userId);
    if (unsubscribe) {
      unsubscribe();
    }
  }
}

export const notificationService = NotificationService.getInstance();