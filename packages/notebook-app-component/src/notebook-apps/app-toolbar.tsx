import React from "react";
import { ContentRef } from "@nteract/core";

import {
  AppToolbar as AppToolbarProvider,
  AppToolbarContext,
  AppToolbarProps,
} from "@nteract/stateful-components";

import {
  Toolbar,
  ToolbarIcons,
  ToolbarItem,
} from "@nteract/presentational-components";

interface ComponentProps {
  contentRef: ContentRef;
}

const AppToolbar = () => (
  <AppToolbarContext.Consumer>
    {(value: AppToolbarProps) => (
      <Toolbar
        onToggleFileBrowser={value.toggleSidebar}
        isSidebarVisible={value.isSidebarVisible}
      >
        <ToolbarItem
          image={<ToolbarIcons.Plus />}
          text="Add Cell"
          onClick={value.addCell}
        />
        <ToolbarItem
          image={<ToolbarIcons.Play />}
          text="Restart &amp; Run"
          onClick={value.restartAndRun}
        />
        <ToolbarItem
          image={<ToolbarIcons.Pause />}
          text="Interrupt"
          onClick={value.interrupt}
        />
        <ToolbarItem
          image={<ToolbarIcons.Clear />}
          text="Clear Outputs"
          onClick={value.clearOutputs}
        />
      </Toolbar>
    )}
  </AppToolbarContext.Consumer>
);

const AppToolbarWrapper = (props: ComponentProps) => (
  <AppToolbarProvider contentRef={props.contentRef} id="app-toolbar">
    <AppToolbar />
  </AppToolbarProvider>
);

export default AppToolbarWrapper;
