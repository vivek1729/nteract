import { createMythicPackage } from "@nteract/myths";
import { consoleNotificationSystem } from "./backends/console";
import { NotificationSystem } from "./types";

export const notifications = createMythicPackage("notifications")<
  {
    current: NotificationSystem;
  }
>({
  initialState: {
    current: consoleNotificationSystem,
  },
});
