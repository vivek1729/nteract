import { createMythicPackage } from "@nteract/myths";
import { CellId } from "@nteract/commutable";

import { List } from "immutable";

export const multiselect = createMythicPackage("multiselect")<{
  selectedCells: List<CellId>;
}>({
  initialState: {
    selectedCells: List(),
  },
});
