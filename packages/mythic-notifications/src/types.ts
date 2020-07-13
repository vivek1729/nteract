import { IconName } from "@blueprintjs/core";

export interface NotificationMessage {
  key?: string;
  icon?: IconName;
  title?: string;
  message: string | JSX.Element;
  level: "error" | "warning" | "info" | "success" | "in-progress";
  action?: {
    icon?: IconName;
    label: string;
    callback: () => void;
  };
}

export interface NotificationSystem {
  addNotification(notification: NotificationMessage): void;
}
