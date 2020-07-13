import { actions } from "@nteract/core";
import { mount, shallow } from "enzyme";
import Immutable from "immutable";
import React from "react";

import { mockAppState } from "@nteract/fixtures";

import {
  KeyboardShortcuts,
  makeMapStateToProps,
  mapDispatchToProps
} from "../../src/decorators/kbd-shortcuts";

describe("KeyboardShortcuts", () => {
  const map = {};
  beforeEach(() => {
    /**
     * This is to written here to enable testing global key handlers
     * on individual events in React components. For more information,
     * checkout this link.
     *
     * https://github.com/airbnb/enzyme/issues/426#issuecomment-228601631
     */
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    document.removeEventListener = jest.fn();
  });
  it("renders without crashing", () => {
    const component = shallow(
      <KeyboardShortcuts contentRef={"test"}>
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(component).not.toBeNull();
  });
  it("does nothing if enter is not pressed", () => {
    const executeFocusedCell = jest.fn();
    const component = shallow(
      <KeyboardShortcuts
        contentRef={"test"}
        executeFocusedCell={executeFocusedCell}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(component).not.toBeNull();
    map.keydown({ key: "Not Enter" });

    expect(executeFocusedCell).not.toBeCalled();
  });
  it("does nothing if a meta key is not pressed", () => {
    const executeFocusedCell = jest.fn();
    const component = shallow(
      <KeyboardShortcuts
        contentRef={"test"}
        executeFocusedCell={executeFocusedCell}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(component).not.toBeNull();
    map.keydown({ key: "Enter", ctrlKey: false });
    expect(executeFocusedCell).not.toBeCalled();
  });
  it("executes focused cell if the correct key combination is pressed", () => {
    const executeFocusedCell = jest.fn();
    const focusNextCell = jest.fn();
    const focusNextCellEditor = jest.fn();

    const component = mount(
      <KeyboardShortcuts
        contentRef={"test"}
        executeFocusedCell={executeFocusedCell}
        focusNextCell={focusNextCell}
        focusNextCellEditor={focusNextCellEditor}
        focusedCell={"cellId"}
        cellOrder={Immutable.List(["cellId", "cellId1"])}
        cellMap={Immutable.Map({
          cellId: Immutable.Map({ cell_type: "code" }),
          cellId1: Immutable.Map({ cell_type: "code" })
        })}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(component).not.toBeNull();
    map.keydown({
      key: "Enter",
      ctrlKey: false,
      metaKey: true,
      shiftKey: true,
      preventDefault: () => {}
    });
    // Should execute the currently focused cell
    expect(executeFocusedCell).toBeCalled();
    // Should focus the next cell
    expect(focusNextCell).toBeCalled();
    // Should focus the next cell editor since it is a code cell
    expect(focusNextCellEditor).toBeCalled();
  });
  it("should not focus next cell's editor if it is markdown", () => {
    const executeFocusedCell = jest.fn();
    const focusNextCell = jest.fn();
    const focusNextCellEditor = jest.fn();

    const component = mount(
      <KeyboardShortcuts
        contentRef={"test"}
        executeFocusedCell={executeFocusedCell}
        focusNextCell={focusNextCell}
        focusNextCellEditor={focusNextCellEditor}
        focusedCell={"cellId"}
        cellOrder={Immutable.List(["cellId", "cellId1"])}
        cellMap={Immutable.Map({
          cellId: Immutable.Map({ cell_type: "code" }),
          cellId1: Immutable.Map({ cell_type: "markdown" })
        })}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(component).not.toBeNull();
    map.keydown({
      key: "Enter",
      ctrlKey: false,
      metaKey: true,
      shiftKey: true,
      preventDefault: () => {}
    });
    // Should execute the currently focused cell
    expect(executeFocusedCell).toBeCalled();
    // Should focus the next cell
    expect(focusNextCell).toBeCalled();
    // Should focus the next cell editor since it is a code cell
    expect(focusNextCellEditor).not.toBeCalled();
  });
  it("removes event listeners when unmounted", () => {
    const component = shallow(
      <KeyboardShortcuts contentRef={"test"}>
        <p>test</p>
      </KeyboardShortcuts>
    );
    component.unmount();
    expect(document.removeEventListener).toBeCalledWith(
      "keydown",
      expect.any(Function)
    );
  });
  it("does not update component when props don't change", () => {
    const component = shallow(
      <KeyboardShortcuts
        contentRef={"test"}
        focusedCell={"cellId"}
        cellOrder={Immutable.List(["cellId", "cellId2"])}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(
      component.instance().shouldComponentUpdate(
        {
          contentRef: "test",
          focusedCell: "cellId",
          cellOrder: Immutable.List(["cellId", "cellId2"])
        },
        {}
      )
    ).toBe(false);
  });
  it("updates component when props change", () => {
    const component = shallow(
      <KeyboardShortcuts
        contentRef={"test"}
        focusedCell={"cellId"}
        cellOrder={Immutable.List(["cellId", "cellId2"])}
      >
        <p>test</p>
      </KeyboardShortcuts>
    );
    expect(
      component.instance().shouldComponentUpdate(
        {
          contentRef: "test",
          focusedCell: "cellId",
          cellOrder: Immutable.List(["cellId", "cellId2", "cellId3"])
        },
        {}
      )
    ).toBe(true);
  });
});

describe("makeMapStateToProps", () => {
  it("returns default values for non-notebook content", () => {
    const state = mockAppState({});
    const ownProps = { contentRef: "contentRef", id: "cellId" };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.cellOrder.size).toBe(0);
    expect(result.cellMap.size).toBe(0);
    expect(result.focusedCell).toBeUndefined();
  });
  it("returns correct values for notebook content", () => {
    const state = mockAppState({ codeCellCount: 2 });
    const contentRef = state.core.entities.contents.byRef.keySeq().first();
    const ownProps = { contentRef };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(result.cellOrder.size).toBe(2);
    expect(result.cellMap.size).toBe(2);
    expect(result.focusedCell).toBeDefined();
  });
});

describe("mapDispatchToProps", () => {
  it("registers actions to dispatch", () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const executedFocusedCellPayload = {
      contentRef: "contentRef"
    };
    result.executeFocusedCell(executedFocusedCellPayload);
    expect(dispatch).toBeCalledWith(
      actions.executeFocusedCell(executedFocusedCellPayload)
    );
    const focusNextCellPayload = { id: "cellId", contentRef: "contentRef" };
    result.focusNextCell(focusNextCellPayload);
    expect(dispatch).toBeCalledWith(
      actions.focusNextCell(focusNextCellPayload)
    );
    result.focusNextCellEditor(focusNextCellPayload);
    expect(dispatch).toBeCalledWith(
      actions.focusNextCellEditor(focusNextCellPayload)
    );
  });
});
