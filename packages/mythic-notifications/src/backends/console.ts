import { NotificationMessage, NotificationSystem } from "../types";

export const consoleNotificationSystem: NotificationSystem = {
  addNotification: (msg: NotificationMessage) => {
    switch (msg.level) {
      case "error":     console.error (msg.title, msg); break;
      case "warning":   console.warn  (msg.title, msg); break;
      default:          console.log   (msg.title, msg); break;
    }
  }
};
