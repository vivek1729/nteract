import { setConfigAtKey, toggleConfigAtKey } from "@nteract/mythic-configuration";
import { DesktopCommand } from "../types";

export const SetPreference: DesktopCommand<typeof setConfigAtKey.props> = {
  name: "SetPreference",
  props: {
    key: "required",
    value: "required",
  },
  makeAction: setConfigAtKey.create,
};

export const TogglePreference: DesktopCommand<
  typeof toggleConfigAtKey.props
> = {
  name: "TogglePreference",
  props: {
    key: "required",
  },
  makeAction: toggleConfigAtKey.create,
};
