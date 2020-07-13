import React from "react";
import { shallow } from "enzyme";

import { NotebookHelmet } from "../../src/decorators/notebook-helmet";

describe("NotebookHelmet", () => {
  it("renders base element onto page", () => {
    const component = shallow(
      <NotebookHelmet contentRef={"testContentRef"} filePath={"~/home/notebooks"}>
        <p>test</p>
      </NotebookHelmet>
    );
    expect(component.exists("base")).toBe(true);
  });
});
