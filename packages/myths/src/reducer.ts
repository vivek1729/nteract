import { default as Immutable, RecordOf } from "immutable";
import { Action } from "redux";
import { MythicAction, Myths, ReducerDefinition } from "./types";

export const makeReducer = <
  PKG extends string,
  NAME extends string,
  STATE,
  PROPS
>(
  reduce: ReducerDefinition<STATE, PROPS> | undefined,
  appliesTo: (action: Action) => boolean,
) =>
  reduce === undefined
    ? (state: RecordOf<STATE>, _action: Action) => state
    : (state: RecordOf<STATE>, action: Action) => {
        if (appliesTo(action)) {
          return (reduce(
            state,
            action as MythicAction<PKG, NAME, PROPS>,
          ) || state);
        } else {
          return state;
        }
      };

export const makeRootReducer = <PKG extends string, STATE>(
  myths: Myths<PKG, STATE>,
  initialState: STATE,
) =>
  (
    state: RecordOf<STATE> = Immutable.Record<STATE>(initialState)(),
    action: MythicAction,
  ) => {
    const applicableMyths = Object
      .values(myths)
      .filter(myth => myth.appliesTo(action));

    if (applicableMyths.length === 0) {
      return state;
    }
    else if (applicableMyths[0].reduce === undefined) {
      return state;
    }
    else {
      return applicableMyths[0].reduce(state, action);
    }
  };
