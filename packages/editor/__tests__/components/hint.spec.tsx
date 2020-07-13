import { mount } from "enzyme";
import React from "react";

import { Hint } from "../../src/components/hint";

describe("Hint", () => {
  it("can be rendered without crashing", () => {
    const component = mount(<Hint text="print()" />);
    expect(component.isEmptyRender()).toBe(false);
  });
  it("renders a TypeIcon when given a type", () => {
    const component = mount(<Hint text="print()" type="keyword" />);
    expect(component.isEmptyRender()).toBe(false);
    expect(component.find(".completion-type-keyword")).not.toHaveLength(0);
  });
});
