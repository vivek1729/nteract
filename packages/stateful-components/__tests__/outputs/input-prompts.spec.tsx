import { mount } from "enzyme";
import Immutable from "immutable";
import React from "react";

import { PromptRequest } from "../../src/outputs/input-prompts";

describe("PromptRequest", () => {
  it("renders no forms when given no prompts", () => {
    const component = mount(<PromptRequest prompts={Immutable.List([])} />);
    expect(component.find("form")).toHaveLength(0);
  });
  it("renders a form for each prompt", () => {
    const component = mount(
      <PromptRequest
        prompts={Immutable.List([
          {
            prompt: "A prompt",
            password: false
          },
          {
            prompt: "Another prompt",
            password: false
          }
        ])}
      />
    );
    expect(component.find("form")).toHaveLength(2);
  });
});
