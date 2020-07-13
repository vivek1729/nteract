import { AppState } from "@nteract/core";
import { DarkTheme, LightTheme } from "@nteract/presentational-components";
import React from "react";
import { connect } from "react-redux";
import { userTheme } from "../../config-options";

interface ComponentProps {
  children: React.ReactNode;
}

interface StateProps {
  theme: keyof typeof themes;
}

const themes = {
  light: <LightTheme/>,
  dark: <DarkTheme/>,
};

export const ThemeFromConfig =
  ({ theme, children }: ComponentProps & StateProps) =>
    <>
      {children}
      {themes[theme]}
    </>;
ThemeFromConfig.displayName = "ThemeFromConfig";

const makeMapStateToProps = (state: AppState) => ({
  theme: userTheme(state)
});

export default connect(makeMapStateToProps)(ThemeFromConfig);
