import * as actions from "@nteract/actions";
import { createContentRef, makeFileModelRecord } from "@nteract/types";

import { file } from "../../../../src/core/entities/contents/file";

describe("file reducers", () => {
  test("UPDATE_FILE_TEXT updates the text contents of a file", () => {
    const contentRef = createContentRef();
    const originalState = makeFileModelRecord();
    const action = actions.updateFileText({
      contentRef,
      text: "some new text"
    });
    const state = file(originalState, action);
    expect(state.text).toEqual("some new text");
  });
});
