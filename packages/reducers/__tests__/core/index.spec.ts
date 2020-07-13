import * as actions from "@nteract/actions";

import { currentKernelspecsRef, kernelRef } from "../../src/core/index";

describe("currentKernelspecsRef", () => {
  it("sets the correct ref when kernelspecs are fetched", () => {
    const originalState = "";
    const action = actions.fetchKernelspecs({
      kernelspecsRef: "test",
      hostRef: "testHost"
    });
    const state = currentKernelspecsRef(originalState, action);
    expect(state).toBe("test");
  });
});

describe("kernelRef", () => {
  it("sets the correct ref when kernel is launched", () => {
    const originalState = "";
    const action = actions.launchKernel({
      kernelRef: "test",
      selectNextKernel: true
    });
    const state = kernelRef(originalState, action);
    expect(state).toBe("test");
  });
  it("sets the correct ref when kernel is successfully launched", () => {
    const originalState = "";
    const action = actions.launchKernelSuccessful({
      kernelRef: "test",
      selectNextKernel: true
    });
    const state = kernelRef(originalState, action);
    expect(state).toBe("test");
  });
});
