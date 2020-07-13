import * as actions from "@nteract/actions";
import Immutable from "immutable";

import {
  makeContentsRecord,
  makeFileContentRecord,
  makeNotebookContentRecord
} from "@nteract/types";
import { byRef } from "../../../../src/core/entities/contents/index";

describe("TOGGLE_HEADER_EDITOR", () => {
  it("toggles the header state on content", () => {
    const originalState = Immutable.Map({
      initiallyOff: makeNotebookContentRecord({ showHeaderEditor: false }),
      initiallyOn: makeNotebookContentRecord({ showHeaderEditor: true })
    });
    const action = actions.toggleHeaderEditor({
      contentRef: "initiallyOff"
    });
    let state = byRef(originalState, action);
    expect(state.getIn(["initiallyOff", "showHeaderEditor"])).toBe(true);
    state = byRef(
      state,
      actions.toggleHeaderEditor({ contentRef: "initiallyOn" })
    );
    expect(state.getIn(["initiallyOn", "showHeaderEditor"])).toBe(false);
  });
});

describe("CHANGE_CONTENT_NAME", () => {
  it("updates filepath of the selected content", () => {
    const originalState = Immutable.Map({
      aContentRef: makeNotebookContentRecord({
        filepath: "some-file.ipynb"
      })
    });
    const action = actions.changeContentName({
      contentRef: "aContentRef",
      prevFilePath: "some-file.ipynb",
      filepath: "new-name.ipynb"
    });
    const state = byRef(originalState, action);
    expect(state.getIn(["aContentRef", "filepath"])).toBe("new-name.ipynb");
  });
});

describe("LAUNCH_KERNEL_SUCCESSFUL", () => {
  it("updates the kernelRef associated with a model", () => {
    const originalState = Immutable.Map({
      aContentRef: makeNotebookContentRecord({})
    });
    const action = actions.launchKernelSuccessful({
      kernelRef: "aKernelRef",
      contentRef: "aContentRef"
    });
    const state = byRef(originalState, action);
    expect(state.getIn(["aContentRef", "model", "kernelRef"])).toEqual(
      "aKernelRef"
    );
  });
});

describe("DISPOSE_CONTENT", () => {
  it("removes content with a particular ContentRef", () => {
    const originalState = Immutable.Map({
      aContentRef: makeNotebookContentRecord({})
    });
    const action = actions.disposeContent({ contentRef: "aContentRef" });
    const state = byRef(originalState, action);
    expect(state.get("aContentRef")).toBeUndefined();
  });
});

describe("FETCH_CONTENT_FAILED", () => {
  it("sets the error state when fetching content fails", () => {
    const originalState = Immutable.Map({
      aContentRef: makeNotebookContentRecord({})
    });
    const error = new Error("test error");
    const action = actions.fetchContentFailed({
      contentRef: "aContentRef",
      error
    });
    const state = byRef(originalState, action);
    expect(state.getIn(["aContentRef", "error"])).toEqual(error);
  });
});
