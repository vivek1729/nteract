// NOTE: These are just default middlewares here for now until we figure out how
// to divide up the desktop app and this core package

import { isCollection } from "immutable";

import { Middleware } from "redux";
import { createLogger } from "redux-logger";

export function logger(): Middleware {
  const craftedLogger = createLogger({
    // predicate: (getState, action) => action.type.includes('COMM'),
    stateTransformer: (state: any) =>
      Object.keys(state).reduce(
        (prev, key) =>
          Object.assign({}, prev, {
            [key]: isCollection(state[key]) ? state[key].toJS() : state[key]
          }),
        {}
      )
  });
  return craftedLogger;
}
