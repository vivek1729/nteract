import React from "react";

import {
  AppSidebar as SidebarProvider,
  AppSidebarContext,
  AppSidebarProps,
} from "@nteract/stateful-components";

import { ContentRef } from "@nteract/core";
import { Sidebar, SidebarItem } from "@nteract/presentational-components";

interface ComponentProps {
  contentRef: ContentRef;
}

const AppSidebar = () => (
  <AppSidebarContext.Consumer>
    {(value: AppSidebarProps) => (
      <Sidebar isVisible={value.isSidebarVisible}>
        <SidebarItem level={1} name={(value as any).filepath} />
      </Sidebar>
    )}
  </AppSidebarContext.Consumer>
);

const AppSidebarWrapper = (props: ComponentProps) => (
  <SidebarProvider id="app-sidebar" contentRef={props.contentRef}>
    <AppSidebar />
  </SidebarProvider>
);

export default AppSidebarWrapper;
