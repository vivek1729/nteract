import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CellId } from "@nteract/commutable";
import { actions, ContentRef } from "@nteract/core";

export interface DispatchProps {
  addCellBelow: () => void;
  addCellAbove: () => void;
  restartAndRun: () => void;
  hideOutput: () => void;
  hideInput: () => void;
  convertToMarkdown: () => void;
}

export interface ComponentProps {
  id: CellId;
  children: React.ReactNode | JSX.Element;
  contentRef: ContentRef;
}

export type CommandProps = DispatchProps;

export const CommandContext = React.createContext({});

class CommandContainer extends React.PureComponent<CommandProps> {
  render() {
    return (
      <CommandContext.Provider value={this.props}>
        {this.props.children}
      </CommandContext.Provider>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ComponentProps
): DispatchProps => {
  const { id, contentRef } = ownProps;

  return {
    addCellBelow: () => {
      dispatch(
        actions.createCellBelow.with({ cellType: "code", source: "" })({
          contentRef,
        })
      );
    },
    addCellAbove: () => {
      dispatch(
        actions.createCellAbove.with({ cellType: "code", source: "" })({
          contentRef,
        })
      );
    },
    restartAndRun: () => dispatch(actions.executeAllCells({ contentRef })),
    convertToMarkdown: () =>
      dispatch(actions.changeCellType.with({ contentRef })({ to: "markdown" })),
    hideInput: () =>
      dispatch(actions.toggleCellInputVisibility({ id, contentRef })),
    hideOutput: () =>
      dispatch(actions.toggleCellOutputVisibility({ id, contentRef })),
  };
};

export default connect(null, mapDispatchToProps)(CommandContainer);
