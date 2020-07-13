import * as actions from "@nteract/actions";
import { makeMessagesRecord } from "@nteract/types";
import { List } from "immutable";
import { Action, AnyAction, Reducer } from "redux";
import { combineReducers } from "redux-immutable";

export const messageQueue = (
  state: List<AnyAction> = List<AnyAction>(),
  action: actions.EnqueueAction | actions.ClearMessageQueue
): List<AnyAction> => {
  switch (action.type) {
    case actions.ENQUEUE_ACTION:
      return state.push(action);
    case actions.CLEAR_MESSAGE_QUEUE:
      return state.clear();
    default:
      return state;
  }
};

export const messages: Reducer<
  {
    messageQueue: List<AnyAction>;
  },
  Action<any>
> = combineReducers({ messageQueue }, makeMessagesRecord as any);
