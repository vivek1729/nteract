// Vendor modules
import * as actions from "@nteract/actions";
import {
  HostRecord,
  makeHostsRecord,
  makeJupyterHostRecord,
  makeLocalHostRecord
} from "@nteract/types";
import { List, Map } from "immutable";
import { Action, Reducer } from "redux";
import { combineReducers } from "redux-immutable";

const byRef = (
  state = Map<string, HostRecord>(),
  action: Action
): Map<string, HostRecord> => {
  let typedAction;
  switch (action.type) {
    case actions.ADD_HOST:
      typedAction = action as actions.AddHost;
      switch (typedAction.payload.host.type) {
        case "jupyter": {
          return state.set(
            typedAction.payload.hostRef,
            makeJupyterHostRecord(typedAction.payload.host)
          );
        }
        case "local": {
          return state.set(
            typedAction.payload.hostRef,
            makeLocalHostRecord(typedAction.payload.host)
          );
        }
        default:
          throw new Error(
            `Unrecognized host type "${typedAction.payload.host.type}".`
          );
      }
    case actions.REMOVE_HOST:
      typedAction = action as actions.RemoveHost;
      return state.remove(typedAction.payload.hostRef);
    default:
      return state;
  }
};

const refs = (state = List(), action: Action): List<string> => {
  switch (action.type) {
    case actions.ADD_HOST:
      return state.push((action as actions.AddHost).payload.hostRef);
    case actions.REMOVE_HOST:
      return state.filter(
        hostRef => hostRef !== (action as actions.RemoveHost).payload.hostRef
      );
    default:
      return state;
  }
};

export const hosts: Reducer<
  {
    byRef: Map<string, HostRecord>;
    refs: List<string>;
  },
  Action<any>
> = combineReducers({ byRef, refs }, makeHostsRecord as any);
