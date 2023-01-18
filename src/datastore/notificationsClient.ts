import { NotificationsHTTPClient } from "./types";
import { mockHttpClient } from "./mockHttpClient";
import { httpClient } from "./httpClient";

export function getNotificationsClient(): NotificationsHTTPClient {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  if (isDev) {
    return mockHttpClient;
  } else {
    return httpClient;
  }
}
