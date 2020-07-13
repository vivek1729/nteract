import { mount } from "enzyme";
import Immutable from "immutable";
import React from "react";

import { selectors } from "@nteract/core";
import { mockAppState } from "@nteract/fixtures";
import { RichMedia } from "@nteract/outputs";

import { makeMapStateToProps, Pagers } from "../../src/outputs/pagers";

describe("makeMapStateToProps", () => {
  it("returns an empty set of pagers for non-notebook files", () => {
    const state = mockAppState();
    const ownProps = {
      contentRef: "anyContentRef",
      id: "nonExistantCell",
      children: []
    };
    const mapStateToProps = makeMapStateToProps(state, ownProps);
    expect(mapStateToProps(state)).toEqual({ pagers: Immutable.List() });
  });
  it("returns an empty set of pagers for non-existant cells", () => {
    const state = mockAppState();
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const ownProps = { contentRef, id: "nonExistantCell", children: [] };
    const mapStateToProps = makeMapStateToProps(state, ownProps);
    expect(mapStateToProps(state)).toEqual({ pagers: Immutable.List() });
  });
  it("returns a set of pagers for existant cells", () => {
    // Generate mock state with single cell
    const mockState = mockAppState({ codeCellCount: 1 });
    // Extract pre-generated content ref and cell ID
    const contentRef = mockState.core.entities.contents.byRef.keySeq().first();
    const model = selectors.model(mockState, { contentRef });
    const id = selectors.notebook.cellOrder(model).first();
    // Update pagers for testing
    const pagers = Immutable.List(["test"]);
    const state = {
      ...mockState,
      core: mockState.core.setIn(
        ["entities", "contents", "byRef", contentRef, "model", "cellPagers"],
        Immutable.Map({ [id]: pagers })
      )
    };
    const ownProps = { contentRef, id, children: [] };
    const mapStateToProps = makeMapStateToProps(state, ownProps);
    expect(mapStateToProps(state)).toEqual({ pagers });
  });
});

describe("Pagers", () => {
  it("renders nothing for empty list of pagers", () => {
    const component = mount(
      <Pagers contentRef={"contentRef"} id={"id"} pagers={Immutable.List()} />
    );
    expect(component.find(RichMedia)).toHaveLength(0);
  });
  it("renders RichMedia for each pager", () => {
    const component = mount(
      <Pagers
        contentRef={"contentRef"}
        id={"id"}
        pagers={Immutable.List([
          { data: { key: "value" } },
          { data: { key: "value" } }
        ])}
      />
    );
    expect(component.find(RichMedia)).toHaveLength(2);
  });
});
