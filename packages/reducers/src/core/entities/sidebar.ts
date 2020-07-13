// Vendor modules
import * as actions from "@nteract/actions";
import { makeSidebarRecord } from "@nteract/types";
import { Action, Reducer } from "redux";
import { combineReducers } from "redux-immutable";

export const isSidebarVisible = (
  state: boolean = false,
  action: actions.ToggleSidebar
): boolean => {
  switch (action.type) {
    case actions.TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
};

export const sidebar: Reducer<
  {
    isSidebarVisible: boolean;
  },
  Action<any>
> = combineReducers({ isSidebarVisible }, makeSidebarRecord as any);
