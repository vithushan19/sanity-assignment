import { NotificationsHTTPClient } from "./types";
import { mockHttpClient } from "./mockHttpClient";
import { httpClient } from "./httpClient";

export function getNotificationsClient(): NotificationsHTTPClient {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  // const isDev = true;
  if (isDev) {
    return mockHttpClient;
  } else {
    return httpClient;
  }
}
