import * as actions from "@nteract/actions";
import { makeEditorComponentsRecord } from "@nteract/types";
import { Map } from "immutable";
import { Action, Reducer } from "redux";
import { combineReducers } from "redux-immutable";

export const byEditorType = (
  state = Map<string, any>(),
  action: Action
): Map<string, any> => {
  let typedAction;
  switch (action.type) {
    case actions.ADD_EDITOR_COMPONENT:
      typedAction = action as actions.AddEditorComponent;
      return state.set(
        typedAction.payload.editorType,
        typedAction.payload.component
      );
    default:
      return state;
  }
};

export const editorComponents: Reducer<
  {
    byEditorType: Map<string, any>;
  },
  Action<any>
> = combineReducers({ byEditorType }, makeEditorComponentsRecord as any);