import { mount } from "enzyme";
import Immutable from "immutable";
import React from "react";

import { selectors } from "@nteract/core";
import { mockAppState } from "@nteract/fixtures";

import { makeMapStateToProps, Cell } from "../../src/cells/cell";

describe("Cell", () => {
  it("picks the correct child component when it exists", () => {
    function ChosenOneCell(props) {
      return <p>ChosenOneCell</p>;
    }
    ChosenOneCell.defaultProps = { cell_type: "the_one" };
    function NotTheOneCell(props) {
      return <p>NotTheOneCell</p>;
    }
    NotTheOneCell.defaultProps = { cell_type: "not_the_one" };
    const component = mount(
      <Cell
        id="cellId"
        contentRef="contentRef"
        cell={Immutable.Map({ cell_type: "the_one" })}
      >
        <ChosenOneCell />
        <NotTheOneCell />
      </Cell>
    );
    expect(component.html()).toBe(
      '<div class="nteract-cell-container "><p>ChosenOneCell</p></div>'
    );
  });
  it("returns null when no valid child component exists", () => {
    function ChosenOneCell(props) {
      return <p>ChosenOneCell</p>;
    }
    ChosenOneCell.defaultProps = { cell_type: "the_one" };
    function NotTheOneCell(props) {
      return <p>NotTheOneCell</p>;
    }
    NotTheOneCell.defaultProps = { cell_type: "not_the_one" };
    const component = mount(
      <Cell
        id="cellId"
        contentRef="contentRef"
        cell={Immutable.Map({ cell_type: "neither_one" })}
      >
        <ChosenOneCell />
        <NotTheOneCell />
      </Cell>
    );
    expect(component.children()).toHaveLength(0);
  });
  it("only looks for the cell_type prop when matching", () => {
    function ChosenOneCell(props) {
      return <p>ChosenOneCell</p>;
    }
    ChosenOneCell.defaultProps = { not_cell_type: "the_one" };
    function NotTheOneCell(props) {
      return <p>NotTheOneCell</p>;
    }
    NotTheOneCell.defaultProps = { cell_type: "not_the_one" };
    const component = mount(
      <Cell
        id="cellId"
        contentRef="contentRef"
        cell={Immutable.Map({ cell_type: "the_one" })}
      >
        <ChosenOneCell />
        <NotTheOneCell />
      </Cell>
    );
    expect(component.children()).toHaveLength(0);
  });
});

describe("makeMapStateToProps", () => {
  it("returns nothing if content is not a notebook", () => {
    const state = mockAppState({});
    const ownProps = { id: "cellId", contentRef: "contentRef", children: [] };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.selected).toBe(false);
    expect(result.cell).toBeUndefined();
  });
  it("returns nothing if there is no cell with an id", () => {
    const state = mockAppState({});
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const ownProps = { id: "cellId", contentRef, children: [] };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.selected).toBe(false);
    expect(result.cell).toBeUndefined();
  });
  it("returns correct info for currently focused cell", () => {
    const state = mockAppState({ codeCellCount: 3 });
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const model = selectors.model(state, { contentRef });
    const cellOrder = selectors.notebook.cellOrder(model);
    const ownProps = { id: cellOrder.last(), contentRef, children: [] };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.selected).toBe(false);
    expect(result.cell).toBeDefined();
  });
  it("returns correct info for currently focused cell", () => {
    const state = mockAppState({ codeCellCount: 3 });
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const model = selectors.model(state, { contentRef });
    const cellOrder = selectors.notebook.cellOrder(model);
    const ownProps = { id: cellOrder.get(1), contentRef, children: [] };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.selected).toBe(true);
    expect(result.cell).toBeDefined();
  });
});
