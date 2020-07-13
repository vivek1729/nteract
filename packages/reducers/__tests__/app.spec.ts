import * as actions from "@nteract/actions";
import { SetAppHostAction } from "@nteract/actions";
import * as stateModule from "@nteract/types";
import { makeJupyterHostRecord, makeLocalHostRecord } from "@nteract/types";
import * as reducers from "../src";

describe("save", () => {
  test("should set isSaving to true", () => {
    const originalState = stateModule.makeAppRecord({
      isSaving: false,
      kernel: stateModule.makeLocalKernelRecord({
        channels: false,
        spawn: false,
        connectionFile: false
      })
    });
    const state = reducers.app(originalState, actions.save({}));
    expect(state.isSaving).toBe(true);
  });
});

describe("saveFailed", () => {
  test("should set isSaving to false", () => {
    const originalState = stateModule.makeAppRecord({
      isSaving: true
    });

    const state = reducers.app(originalState, actions.saveFailed({}));
    expect(state.isSaving).toBe(false);
  });
});

describe("saveFulfilled", () => {
  test("should set isSaving to false", () => {
    const originalState = stateModule.makeAppRecord({
      isSaving: true
    });

    const state = reducers.app(originalState, actions.saveFulfilled({}));
    expect(state.isSaving).toBe(false);
  });
});

describe("setGithubToken", () => {
  test("calls setGithubToken", () => {
    const originalState = stateModule.makeAppRecord({
      githubToken: null
    });

    const action = {
      type: actions.SET_GITHUB_TOKEN,
      payload: { githubToken: "TOKEN" }
    };

    const state = reducers.app(originalState, (action as unknown) as any);
    expect(state.githubToken).toBe("TOKEN");
  });
});

describe("setAppHost", () => {
  test("can set local record", () => {
    const originalState = stateModule.makeAppRecord({
      host: null
    });

    const action: SetAppHostAction = {
      type: actions.SET_APP_HOST,
      payload: { host: makeLocalHostRecord({ id: "anid" }) }
    };

    const state = reducers.app(originalState, action);
    expect(state.host.get("type")).toBe("local");
    expect(state.host.get("id")).toBe("anid");
  });

  test("can set Jupyter record", () => {
    const originalState = stateModule.makeAppRecord({
      host: null
    });

    const action: SetAppHostAction = {
      type: actions.SET_APP_HOST,
      payload: { host: makeJupyterHostRecord({ id: "anotherid" }) }
    };

    const state = reducers.app(originalState, action);
    expect(state.host.get("type")).toBe("jupyter");
    expect(state.host.get("id")).toBe("anotherid");
  });
});

describe("it does not change state for out-of-scope actions", () => {
  const originalState = stateModule.makeAppRecord({});
  const action = actions.killKernel({ restarting: false, kernelRef: "test" });

  const state = reducers.app(originalState, action);
  expect(state).toEqual(originalState);
});
