import { AppState } from "@nteract/types";

export const editorComponentsbyEditorType = (state: AppState) =>
  state.core.entities.editorComponents.byEditorType;

export const editorComponent = (state: AppState, { id }: { id: string }) =>
  editorComponentsbyEditorType(state).get(id);
