import { mount } from "enzyme";
import React from "react";

import { Tip, Tooltip } from "../../src/components/tooltip";

describe("Tooltip", () => {
  it("can be rendered without crashing", () => {
    const bundle = {
      "text/plain": "This is some text"
    };
    const cursorCoords = { top: 20, bottom: 20, left: 2 };
    const deleteTip = jest.fn();
    const component = mount(
      <Tooltip
        bundle={bundle}
        cursorCoords={cursorCoords}
        deleteTip={deleteTip}
      />
    );
    expect(component.isEmptyRender()).toBe(false);
  });
  it("deletes the tooltip on keybress", () => {
    const bundle = {
      "text/plain": "This is some text"
    };
    const cursorCoords = { top: 20, bottom: 20, left: 2 };
    const deleteTip = jest.fn();
    const component = mount(
      <Tooltip
        bundle={bundle}
        cursorCoords={cursorCoords}
        deleteTip={deleteTip}
      />
    );
    component.find(Tip).simulate("keydown", { key: "Escape" });
    expect(deleteTip).toBeCalled();
  });
});
