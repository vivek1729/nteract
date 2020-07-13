import { Subject } from "rxjs";

const tooltip = require("../../src/jupyter/tooltip");

describe("tooltipRequest", () => {
  it("creates a valid v5 message for inspect_request", () => {
    const message = tooltip.tooltipRequest("map", 3);
    expect(message.content).toEqual({
      code: "map",
      cursor_pos: 3,
      detail_level: 0
    });
    expect(message.header.msg_type).toEqual("inspect_request");
  });
});

describe("tool", () => {
  it("extracts the correct properties from the editor", () => {
    const editor = {
      getCursor: jest.fn(() => ({ top: 0, bottom: 0, left: 2 })),
      indexFromPos: jest.fn(cursor => 0),
      getValue: jest.fn(() => "This is a test")
    };
    const channels = new Subject();
    tooltip.tool(channels, editor);
    expect(editor.getCursor).toBeCalled();
    expect(editor.indexFromPos).toBeCalled();
    expect(editor.getValue).toBeCalledTimes(2);
  });
});
