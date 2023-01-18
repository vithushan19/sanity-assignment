import { simulateRandomDelay } from "../utils/delay";
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
  async fetchNotifications() {
    // "database" read
    const result = notifications;
    // simulate a bit of random network delay
    // simulate some random delay
    await simulateRandomDelay(100, 1000);
    return result;
  },
  // pretend this is doing a http request
  async create(
    notification: Omit<Notification, "createdAt"> & { createdAt?: string }
  ) {
    await simulateRandomDelay(100, 200);

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
    await simulateRandomDelay(50, 500);

    // const index = notifications.findIndex(
    //   (notification) => notification.id === notificationId
    // );
    // notifications.splice(index, 1);
    // TODO read https://stackoverflow.com/questions/41420333/why-splice-not-working-correctly-in-react
    // You're state is not being updated correctly because you're using the splice method which is mutating your "database"
    // You should be creating a new copy of the array instead of mutating the original
    notifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
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
  createAll: async function (
    notification: Omit<Notification, "createdAt">[]
  ): Promise<void> {
    await simulateRandomDelay(100, 200);

    const updatedNotifications = notifications.map((notification) => {
      return {
        ...notification,
        createdAt: new Date().toISOString(),
      };
    });
    notifications = notifications.concat(updatedNotifications);
    listeners.forEach((listener) =>
      // notify listener
      listener()
    );
  },
};
