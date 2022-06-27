import { multiselect } from "../package";

export const selectCell = multiselect.createMyth("selectCell")<{ id: string }>({
  reduce: (state, action) =>
    state.update("selectedCells", (list) => list.push(action.payload.id)),
});

export const unselectCell = multiselect.createMyth("unselectCell")<{
  id: string;
}>({
  reduce: (state, action) =>
    state.update("selectedCells", (list) =>
      list.filter((d) => d !== action.payload.id)
    ),
});

export const clearSelectedCells = multiselect.createMyth("clearSelectedCells")<
  null
>({
  reduce: (state) => state.update("selectedCells", (list) => list.clear()),
});
