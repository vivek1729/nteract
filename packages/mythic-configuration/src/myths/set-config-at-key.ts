import { fromJS } from "immutable";
import { of } from "rxjs";
import { configuration } from "../package";
import { saveConfig } from "./save-config";

export const setConfigAtKey = configuration.createMyth("setConfigAtKey")<{
  key: string;
  value: any;
}>({
  reduce: (state, action) =>
    state.setIn(
      ["current", ...action.payload.key.split(".")],
      fromJS(action.payload.value),
    ),

  thenDispatch: [
    () => of(saveConfig.create()),
  ],
});
