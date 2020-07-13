import * as actions from "@nteract/actions";
import {
  createHostRef,
  makeHostsRecord,
  makeLocalHostRecord
} from "@nteract/types";
import Immutable from "immutable";

import { hosts } from "../../../src/core/entities/hosts";

describe("hosts reducers", () => {
  test("ADD_HOST throws an error for unknown host types", () => {
    const originalState = makeHostsRecord();
    const hostRef = createHostRef();
    const action = actions.addHost({
      hostRef,
      host: {
        type: "not-valid"
      }
    });
    const invocation = () => hosts(originalState, action);
    expect(invocation).toThrow();
  });
  test("ADD_HOST inserts valid host type correctly", () => {
    const originalState = makeHostsRecord();
    const hostRef = createHostRef();
    const action = actions.addHost({
      hostRef,
      host: {
        type: "local"
      }
    });
    const state = hosts(originalState, action);
    expect(state.refs.size).toBe(1);
    expect(state.byRef.get(hostRef)).not.toBeUndefined();
  });
  test("REMOVE_HOST removes host by HostRef", () => {
    const hostRef = createHostRef();
    const originalState = makeHostsRecord({
      refs: Immutable.List([hostRef]),
      byRef: Immutable.Map({
        [hostRef]: makeLocalHostRecord()
      })
    });

    const action = actions.removeHost({
      hostRef
    });
    expect(originalState.refs.size).toBe(1);
    expect(originalState.byRef.get(hostRef)).not.toBeUndefined();
    const state = hosts(originalState, action);
    expect(state.refs.size).toBe(0);
    expect(state.byRef.get(hostRef)).toBeUndefined();
  });
});
