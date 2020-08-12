import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actions, ContentRef } from "@nteract/core";

interface Props {
  contentRef?: ContentRef;
  addEditorComponent(editorType: string, component: any): void;
}

export class EditorLoader extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  loadEditors() {
    // Add the editor components to state
    import(
      /* webpackChunkName: "codemirror" */ "@nteract/stateful-components/src/inputs/connected-editors/codemirror"
    ).then(cm => {
      this.props.addEditorComponent("codemirror", cm.default);
    });

    import(
      /* webpackChunkName: "monaco" */ "@nteract/stateful-components/src/inputs/connected-editors/monacoEditor"
    ).then(monaco => {
      this.props.addEditorComponent("monaco", monaco.default);
    });
  }
  componentDidMount() {
    this.loadEditors();
  }

  render() {
    return null;
  }
}

const makeMapDispatchToProps = (
  initialDispatch: Dispatch
) => {
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      addEditorComponent: (editorType: string, component: any) => {
        return dispatch(
          actions.addEditorComponent({
            editorType,
            component
          })
        );
      }
    };
  };
  return mapDispatchToProps;
};

export default connect(null, makeMapDispatchToProps)(EditorLoader);