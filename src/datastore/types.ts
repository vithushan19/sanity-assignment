export interface Notification {
  id: string;
  createdAt: string;
  message: string;
}

export type Listener = () => void;

export interface NotificationsHTTPClient {
  fetchNotifications: () => Promise<Notification[]>;
  listenNotifications: (listener: () => void) => () => void;
  create: (notification: Omit<Notification, "createdAt">) => Promise<void>;
  createAll: (notification: Omit<Notification, "createdAt">[]) => Promise<void>;
  delete: (notificationId: string) => Promise<void>;
}
