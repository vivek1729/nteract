import { editor } from "monaco-editor";
import * as React from "react";

export interface MonacoEditorProps {
  mode?: string;
  onChange: (value: string) => void;
  value: string;
  editorFocused: boolean;
}

export default class MonacoEditor extends React.Component<MonacoEditorProps> {
  static defaultProps = {
    onChange: () => {},
    editorFocused: false,
    mode: "text/plain"
  };

  monaco?: editor.IStandaloneCodeEditor;
  monacoContainerRef = React.createRef<HTMLDivElement>();

  onDidChangeModelContent() {
    if (this.monaco && this.props.onChange) {
      this.props.onChange(this.monaco.getValue());
    }
  }

  componentDidMount() {
    this.monaco = editor.create(this.monacoContainerRef.current!, {
      value: this.props.value,
      language: this.props.mode,
      minimap: {
        enabled: false
      },
      autoIndent: "full"
    });

    if (this.props.editorFocused) {
      this.monaco.focus();
    }

    this.monaco.onDidChangeModelContent(
      this.onDidChangeModelContent.bind(this)
    );
  }

  componentDidUpdate() {
    if (!this.monaco) {
      return;
    }

    if (this.monaco.getValue() !== this.props.value) {
      // FIXME: calling setValue resets cursor position in monaco. It shouldn't!
      this.monaco.setValue(this.props.value);
    }

    const model = this.monaco.getModel();
    if (model && this.props.mode && model.getModeId() !== this.props.mode) {
      editor.setModelLanguage(model, this.props.mode);
    }
  }

  componentWillUnmount() {
    if (this.monaco) {
      this.monaco.dispose();
    }
  }

  render() {
    return (
      <div className="monaco cm-s-composition" ref={this.monacoContainerRef} />
    );
  }
}
