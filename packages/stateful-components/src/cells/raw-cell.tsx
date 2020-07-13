import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ImmutableCell } from "@nteract/commutable";
import { actions, AppState, ContentRef } from "@nteract/core";
import { Source } from "@nteract/presentational-components";

import Editor, { PassedEditorProps, EditorSlots } from "../inputs/editor";
import CodeMirrorEditor from "../inputs/connected-editors/codemirror";

interface NamedRawCellSlots {
  editor?: EditorSlots;
  toolbar?: () => JSX.Element;
}

interface ComponentProps {
  id: string;
  contentRef: ContentRef;
  cell?: ImmutableCell;
  cell_type: "raw";
  children?: NamedRawCellSlots;
}

interface DispatchProps {
  focusAboveCell: () => void;
  focusBelowCell: () => void;
}

export class PureRawCell extends React.Component<
  ComponentProps & DispatchProps
> {
  render() {
    const { id, contentRef, children } = this.props;

    const defaults = {
      editor: {
        codemirror: (props: PassedEditorProps) => (
          <CodeMirrorEditor {...props} editorType={"codemirror"} />
        )
      }
    };

    const editor = children?.editor || defaults.editor;
    const toolbar = children?.toolbar;

    return (
      <div className="nteract-raw-cell nteract-cell">
        {toolbar && toolbar()}
        <Source className="nteract-cell-source">
          <Editor id={id} contentRef={contentRef}>
            {editor}
          </Editor>
        </Source>
      </div>
    );
  }
}

export const makeMapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ComponentProps
): ((dispatch: Dispatch) => DispatchProps) => {
  const mapDispatchToProps = (dispatch: Dispatch) => {
    const { id, contentRef } = ownProps;
    return {
      focusAboveCell: () => {
        dispatch(actions.focusPreviousCell({ id, contentRef }));
        dispatch(actions.focusPreviousCellEditor({ id, contentRef }));
      },
      focusBelowCell: () => {
        dispatch(
          actions.focusNextCell({ id, createCellIfUndefined: true, contentRef })
        );
        dispatch(actions.focusNextCellEditor({ id, contentRef }));
      }
    };
  };
  return mapDispatchToProps;
};

const RawCell = connect<void, DispatchProps, ComponentProps, AppState>(
  null,
  makeMapDispatchToProps
)(PureRawCell);

export default RawCell;
