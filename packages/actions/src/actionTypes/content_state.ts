// tslint:disable:max-line-length
import { JSONObject, MediaBundle } from "@nteract/commutable";
import { HeaderDataProps } from "@nteract/types";
import { Action, ErrorAction, HasContent, makeActionFunction, makeErrorActionFunction, MaybeHasContent } from "../utils";

export const TOGGLE_HEADER_EDITOR           = "CORE/TOGGLE_HEADER_EDITOR";
export const UPDATE_FILE_TEXT               = "UPDATE_FILE_TEXT";
export const UPDATE_DISPLAY                 = "UPDATE_DISPLAY";
export const UPDATE_DISPLAY_FAILED          = "UPDATE_DISPLAY_FAILED";
export const OVERWRITE_METADATA_FIELDS      = "CORE/OVERWRITE_METADATA_FIELDS";
export const OVERWRITE_METADATA_FIELD       = "OVERWRITE_METADATA_FIELD";
export const DELETE_METADATA_FIELD          = "DELETE_METADATA_FIELD";

export type ToggleHeaderEditor              = Action     <typeof TOGGLE_HEADER_EDITOR,          HasContent>;
export type UpdateFileText                  = Action     <typeof UPDATE_FILE_TEXT,              HasContent & { text: string }>;
export type UpdateDisplay                   = Action     <typeof UPDATE_DISPLAY,                HasContent &  { content:  { output_type: "update_display_data"; data: MediaBundle; metadata: JSONObject; transient: { display_id: string } } }>;
export type UpdateDisplayFailed             = ErrorAction<typeof UPDATE_DISPLAY_FAILED,         HasContent>;
export type OverwriteMetadataFields         = Action     <typeof OVERWRITE_METADATA_FIELDS,     MaybeHasContent & Partial<HeaderDataProps>>;
export type OverwriteMetadataField          = Action     <typeof OVERWRITE_METADATA_FIELD,      HasContent &  { field: string; value: any }>;
export type DeleteMetadataField             = Action     <typeof DELETE_METADATA_FIELD,         HasContent &  { field: string }>;

export const toggleHeaderEditor             = makeActionFunction      <ToggleHeaderEditor>      (TOGGLE_HEADER_EDITOR);
export const updateFileText                 = makeActionFunction      <UpdateFileText>          (UPDATE_FILE_TEXT);
export const updateDisplay                  = makeActionFunction      <UpdateDisplay>           (UPDATE_DISPLAY);
export const updateDisplayFailed            = makeErrorActionFunction <UpdateDisplayFailed>     (UPDATE_DISPLAY_FAILED);
export const overwriteMetadataFields        = makeActionFunction      <OverwriteMetadataFields> (OVERWRITE_METADATA_FIELDS);
export const overwriteMetadataField         = makeActionFunction      <OverwriteMetadataField>  (OVERWRITE_METADATA_FIELD);
export const deleteMetadataField            = makeActionFunction      <DeleteMetadataField>     (DELETE_METADATA_FIELD);
