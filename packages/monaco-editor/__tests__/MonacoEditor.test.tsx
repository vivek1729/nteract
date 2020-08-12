import * as React from "react";
import * as Monaco from "monaco-editor";
import { default as MonacoEditor } from "../src/MonacoEditor";
import { mount } from "enzyme";

// Common Props required to instantiate MonacoEditor View, shared by all tests.
const monacoEditorCommonProps = {
  id: "foo",
  contentRef: "bar",
  editorType: "monaco",
  indentSize: 4,
  tabSize: 4,
  theme: "vs",
  value: "test_value",
  enableCompletion: true,
  language: "python",
  onCursorPositionChange: () => {}
};

describe("MonacoEditor component is rendering correctly", () => {
  it("Should render MonacoEditor component", () => {
    const editorWrapper = mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={false}
      />
    );
    expect(editorWrapper).not.toBeNull();
  });
});

// Setup items shared by all tests in this block
// Mock out the common API methods so that private function calls don't fail
const mockEditor = {
  onDidChangeModelContent: jest.fn(),
  onDidFocusEditorText: jest.fn(),
  onDidBlurEditorText: jest.fn(),
  onDidChangeCursorSelection: jest.fn(),
  updateOptions: jest.fn(),
  getValue: jest.fn(),
  setValue: jest.fn(),
  getConfiguration: jest.fn(),
  layout: jest.fn(),
  getModel: jest.fn(),
  getSelection: jest.fn(),
  focus: jest.fn(),
  hasTextFocus: jest.fn(),
  addCommand: jest.fn(),
  changeViewZones: jest.fn()
};

const mockEditorModel = {
  updateOptions: jest.fn()
}
const mockCreateEditor = jest.fn().mockReturnValue(mockEditor);
Monaco.editor.create = mockCreateEditor;
Monaco.editor.createModel = jest.fn().mockReturnValue(mockEditorModel);
MonacoEditor.prototype.calculateHeight = jest.fn();
MonacoEditor.prototype.registerDefaultCompletionProvider = jest.fn();

describe("MonacoEditor default wcompletion provider", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should call registerDefaultCompletionProvider method when registerCompletionUsingDefault is set to true", () => {
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={true}
        enableCompletion={true}
        shouldRegisterDefaultCompletion={true}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(MonacoEditor.prototype.registerDefaultCompletionProvider).toHaveBeenCalledTimes(1);
  });

  it("Should not call registerDefaultCompletionProvider method when registerCompletionUsingDefault is set to false", () => {
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={true}
        enableCompletion={true}
        shouldRegisterDefaultCompletion={false}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(MonacoEditor.prototype.registerDefaultCompletionProvider).toHaveBeenCalledTimes(0);
  });
});

describe("MonacoEditor lifeCycle methods set up", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should call calculateHeight method before rendering editor", () => {
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={true}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(MonacoEditor.prototype.calculateHeight).toHaveBeenCalledTimes(1);
  });

  it("Should set editor's focus on render if editorFocused prop is set and editor does not have focus", () => {
    mockEditor.hasTextFocus = jest.fn().mockReturnValue(false);
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={true}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(mockEditor.focus).toHaveBeenCalledTimes(1);
  });

  it("Should not set editor's focus on render if editorFocused prop is set but editor already has focus", () => {
    mockEditor.hasTextFocus = jest.fn().mockReturnValue(true);
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={true}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(mockEditor.focus).toHaveBeenCalledTimes(0);
  });

  it("Should not set editor's focus on render if editorFocused prop is false", () => {
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={false}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    expect(mockEditor.focus).toHaveBeenCalledTimes(0);
  });
});

/*
describe("MonacoEditor lineNumbers configuration", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should set lineNumbers on editor when set in props", () => {
    const monacoPropsWithOptions = {
      ...monacoEditorCommonProps,
      options: {
        lineNumbers: "on"
      }
    };

    mount(
      <MonacoEditor
        {...monacoPropsWithOptions}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={false}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    // Get the second arg to Monaco.editor.create call
    const editorCreateArgs = mockCreateEditor.mock.calls[0][1];
    expect(editorCreateArgs).toHaveProperty("lineNumbers");
    expect(editorCreateArgs.lineNumbers).toEqual("on");
  });

  it("Should not set lineNumbers on editor when set to false in props", () => {
    mount(
      <MonacoEditor
        {...monacoEditorCommonProps}
        channels={undefined}
        onChange={jest.fn()}
        onFocusChange={jest.fn()}
        editorFocused={false}
      />
    );
    expect(mockCreateEditor).toHaveBeenCalledTimes(1);
    // Get the second arg to Monaco.editor.create call
    const editorCreateArgs = mockCreateEditor.mock.calls[0][1];
    expect(editorCreateArgs).toHaveProperty("lineNumbers");
    expect(editorCreateArgs.lineNumbers).toEqual("off");
  });
});

*/
