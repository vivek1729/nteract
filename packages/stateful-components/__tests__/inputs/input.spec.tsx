import { mount } from "enzyme";
import React from "react";

import { mockAppState } from "@nteract/fixtures";

import { Input, makeMapStateToProps } from "../../src/inputs/input";

describe("Input", () => {
  it("renders nothing when hidden is true", () => {
    const component = mount(<Input hidden />);
    expect(component.isEmptyRender()).toBe(true);
  });
  it("renders children when hidden is false", () => {
    const component = mount(
      <Input hidden={false}>
        <p>A child</p>
      </Input>
    );
    expect(component.isEmptyRender()).toBe(false);
  });
});

describe("makeMapStateToProps", () => {
  it("returns a boolean value", () => {
    const state = mockAppState({});
    const ownProps = { contentRef: "", id: "" };
    const result = makeMapStateToProps(state, ownProps)(state);
    expect(typeof result.hidden).toBe("boolean");
  });
});
