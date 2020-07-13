import { shallow } from "enzyme";
import React from "react";

import CodeCell from "../../src/cells/code-cell";
import { PureMarkdownCell } from "../../src/cells/markdown-cell";
import { PureRawCell } from "../../src/cells/raw-cell";

describe("CodeCell", () => {
  it("renders without crashing", () => {
    const component = shallow(
      <CodeCell contentRef={"aContentRef"} id={"testId"} />
    );
    expect(component).not.toBeNull();
    expect(component.find(".nteract-code-cell")).not.toBeNull();
  });
});

describe("PureMarkdownCell", () => {
  it("renders without crashing", () => {
    const component = shallow(
      <PureMarkdownCell contentRef={"aContentRef"} id={"testId"} />
    );
    expect(component).not.toBeNull();
    expect(component.find(".nteract-md-cell")).not.toBeNull();
  });
});

describe("PureRawCell", () => {
  it("renders without crashing", () => {
    const component = shallow(
      <PureRawCell contentRef={"aContentRef"} id={"testId"} />
    );
    expect(component).not.toBeNull();
    expect(component.find(".nteract-raw-cell")).not.toBeNull();
  });
});
