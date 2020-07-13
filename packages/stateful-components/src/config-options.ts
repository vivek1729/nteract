import { defineConfigOption } from "@nteract/mythic-configuration";

export const {
  selector: userTheme,
} = defineConfigOption({
  key: "theme",
  label: "Theme",
  values: [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ],
  defaultValue: "light",
});
