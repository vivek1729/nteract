import React from "react";

import { ContentRef } from "@nteract/core";

import NotebookHelmet from "../decorators/notebook-helmet";
import DraggableNotebook from "./draggable-with-cell-creator";
import { GlobalHotKeys, KeyMap, configure } from "react-hotkeys";
import AppCommandPalette from "./app-command-palette";

configure({
  ignoreTags: [],
});

import AppSidebar from "./app-sidebar";
import AppToolbar from "./app-toolbar";
interface ComponentProps {
  contentRef: ContentRef;
}

interface ComponentState {
  isCommandPaletteVisible: boolean;
}

const keymap: KeyMap = {
  SHOW_COMMAND_PALETTE: ["ctrl+p", "meta+p"],
};

export default class extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  state: ComponentState = { isCommandPaletteVisible: false };

  showPalette = () => {
    this.setState((previous) => ({
      isCommandPaletteVisible: !previous.isCommandPaletteVisible,
    }));
  };

  render() {
    const handlers = {
      SHOW_COMMAND_PALETTE: this.showPalette,
    };

    const { props } = this;
    return (
      <React.Fragment>
        <GlobalHotKeys keyMap={keymap} handlers={handlers} />
        <AppCommandPalette
          contentRef={props.contentRef}
          isVisible={this.state.isCommandPaletteVisible}
          onToggleVisibility={this.showPalette}
        />
        <NotebookHelmet contentRef={props.contentRef} />
        <div className="sidebar-container">
          <AppSidebar contentRef={props.contentRef} />
          <div className="content-wrapper">
            <AppToolbar contentRef={props.contentRef} />
            <DraggableNotebook contentRef={props.contentRef} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
