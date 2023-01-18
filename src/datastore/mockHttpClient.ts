import { Listener, Notification, NotificationsHTTPClient } from "./types";

let notifications: Notification[] = [
  "Something happened here",
  "Something happened over here",
  "And here",
  "Here too!",
  "So much happening",
  "All the time",
].map((message, index) => ({
  id: `${index}`,
  createdAt: new Date().toISOString(),
  message,
}));

let listeners: Listener[] = [];
export const mockHttpClient: NotificationsHTTPClient = {
  // pretend this is doing a http request
  fetchNotifications() {
    // "database" read
    const result = notifications;
    // simulate a bit of random network delay
    return new Promise((resolve) =>
      // simulate some random delay
      setTimeout(resolve, 100 + Math.random() * 1000)
    ).then(() => result);
  },
  // pretend this is doing a http request
  async create(
    notification: Omit<Notification, "createdAt"> & { createdAt?: string }
  ) {
    await new Promise((resolve) =>
      // simulate some random delay
      setTimeout(resolve, 100 + Math.random() * 200)
    );
    notifications = notifications.concat({
      ...notification,
      createdAt: new Date().toISOString(),
    });
    listeners.forEach((listener) =>
      // notify listener
      listener()
    );
  },
  // pretend this is doing a http request
  async delete(notificationId: string) {
    await new Promise((resolve) =>
      // simulate some random delay
      setTimeout(resolve, 50 + Math.random() * 500)
    );

    const index = notifications.findIndex(
      (notification) => notification.id === notificationId
    );
    notifications.splice(index, 1);
    listeners.forEach((listener) => listener());
  },

  // pretend these notifications are broadcasted over a websockets connection or similar
  listenNotifications(listener: Listener) {
    listeners.push(listener);

    // return unsubscribe method
    return () => {
      listeners = listeners.filter((l) => l === listener);
    };
  },
};
