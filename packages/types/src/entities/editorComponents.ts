import Immutable from "immutable";

export interface EditorComponentProps {
  byEditorType: Immutable.Map<string, any>;
}

export type EditorComponentsRecord = Immutable.RecordOf<EditorComponentProps>;

export const makeEditorComponentsRecord = Immutable.Record<EditorComponentProps>({
  byEditorType: Immutable.Map<string, any>()
});