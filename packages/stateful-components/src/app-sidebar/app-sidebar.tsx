import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";

import { AppState } from "@nteract/types";

export const AppSidebarContext = React.createContext({});
export interface AppSidebarProps extends HTMLAttributes<HTMLDivElement> {
  isSidebarVisible?: boolean;
  filepath?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = (props: AppSidebarProps) => (
  <AppSidebarContext.Provider value={props}>
    {props.children}
  </AppSidebarContext.Provider>
);

interface OwnProps {
  contentRef: string;
}

const makeMapStateToProps = (
  initialState: AppState,
  initialProps: OwnProps
) => {
  const { contentRef } = initialProps;

  const mapStateToProps = (state: AppState) => {
    return {
      filepath: state.core.entities.contents
        .getIn(["byRef", contentRef, "filepath"])
        .split("/")
        .splice(-1, 1),
      isSidebarVisible: state.core.entities.sidebar.isSidebarVisible,
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null)(AppSidebar);
