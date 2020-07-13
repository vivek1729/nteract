import * as actions from "@nteract/actions";
import { makeKernelspec } from "@nteract/types";
import Immutable from "immutable";

import { byRef, refs } from "../../../src/core/entities/kernelspecs";

describe("byRef", () => {
  it("adds kernelspecs to the map when fetched", () => {
    const originalState = Immutable.Map();
    const action = actions.fetchKernelspecsFulfilled({
      kernelspecsRef: "kernelspecsRef",
      hostRef: "hostRef",
      defaultKernelName: "python",
      kernelspecs: {
        python2: makeKernelspec({})
      }
    });
    const state = byRef(originalState, action);
    expect(state.get("kernelspecsRef")).not.toBeUndefined();
  });
});

describe("refs", () => {
  it("adds kernelspec to the list when fetched", () => {
    const originalState = Immutable.List();
    const action = actions.fetchKernelspecsFulfilled({
      kernelspecsRef: "kernelspecsRef",
      hostRef: "hostRef",
      defaultKernelName: "python",
      kernelspecs: {
        python2: makeKernelspec({})
      }
    });
    const state = refs(originalState, action);
    expect(state).toEqual(Immutable.List(["kernelspecsRef"]));
  });
});
