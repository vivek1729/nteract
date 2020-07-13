import React from "react";
import { mount } from "enzyme";

import { selectors } from "@nteract/core";
import { mockAppState } from "@nteract/fixtures";

import { makeMapStateToProps, Editor } from "../../src/inputs/editor";

describe("makeMapStateToProps", () => {
  it("returns default values if input document is not a notebook", () => {
    const state = mockAppState();
    const ownProps = {
      contentRef: "anyContentRef",
      id: "nonExistantCell",
      children: []
    };
    const mapStateToProps = makeMapStateToProps(state, ownProps);
    expect(mapStateToProps(state)).toEqual({
      editorType: "codemirror",
      editorFocused: false,
      channels: null,
      kernelStatus: "not connected",
      value: ""
    });
  });
  it("returns kernel and channels if input cell is code cell", () => {
    const state = mockAppState({ codeCellCount: 1 });
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const model = selectors.model(state, { contentRef });
    const id = selectors.notebook.cellOrder(model).first();
    const ownProps = {
      contentRef,
      id,
      children: []
    };
    const mapStateToProps = makeMapStateToProps(state, ownProps);
    expect(mapStateToProps(state).channels).not.toBeNull();
  });
});

describe("<Editor/>", () => {
  const SubEditor = ({ editorType = "monaco " }) => (
    <div className={editorType} />
  );
  it("returns nothing if it has no children", () => {
    const component = mount(<Editor editorType="monaco" />);
    expect(component.isEmptyRender()).toBe(true);
  });
  it("renders the matching child", () => {
    const component = mount(
      <Editor editorType="monaco">
        {{
          monaco: () => <SubEditor editorType="monaco" />,
          codemirror: () => <SubEditor editorType="codemirror" />
        }}
      </Editor>
    );
    expect(component.find(".monaco")).toHaveLength(1);
    expect(component.find(".codemirror")).toHaveLength(0);
  });
  it("renders nothing if no matching child is found", () => {
    const component = mount(
      <Editor editorType="textarea">
        {{
          monaco: () => <SubEditor editorType="monaco" />,
          codemirror: () => <SubEditor editorType="codemirror" />
        }}
      </Editor>
    );
    expect(component.isEmptyRender()).toBe(true);
  });
});
