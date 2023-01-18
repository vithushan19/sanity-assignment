import { NotificationsHTTPClient, Notification } from "./types";

export const httpClient: NotificationsHTTPClient = {
  fetchNotifications: function (): Promise<Notification[]> {
    return Promise.resolve([]);
  },
  listenNotifications: function (listener: () => void): () => void {
    throw new Error("Function not implemented.");
  },
  create: function (
    notification: Omit<Notification, "createdAt"> & {
      createdAt?: string | undefined;
    }
  ): Promise<void> {
    return Promise.resolve();
  },
  delete: function (notificationId: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  createAll: function (
    notification: Omit<Notification, "createdAt">[]
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
};