import { NotificationRoot } from "@nteract/mythic-notifications";
import { userTheme } from "@nteract/stateful-components";
import { AppState } from "@nteract/types";
import React from "react";
import { connect } from "react-redux";

interface Props {
  theme: string;
}

const PureThemableNotifications = ({ theme }: Props) =>
  <NotificationRoot darkTheme={theme === "dark"}/>;

export const ThemableNotifications = connect(
  (state: AppState) => ({theme: userTheme(state)}),
)(PureThemableNotifications);
ThemableNotifications.displayName = "ThemableNotifications";
