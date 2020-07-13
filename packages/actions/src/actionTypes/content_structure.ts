// tslint:disable:max-line-length
import { KernelspecInfo } from "@nteract/types";
import { Action, ErrorAction, HasContent, HasFilepathChange, HasKernel, makeActionFunction, makeErrorActionFunction } from "../utils";

export const CHANGE_CONTENT_NAME            = "CORE/CHANGE_CONTENT_NAME";
export const CHANGE_CONTENT_NAME_FULFILLED  = "CORE/CHANGE_CONTENT_NAME_FULFILLED";
export const CHANGE_CONTENT_NAME_FAILED     = "CORE/CHANGE_CONTENT_NAME_FAILED";
export const CHANGE_FILENAME                = "CHANGE_FILENAME";
export const NEW_NOTEBOOK                   = "NEW_NOTEBOOK";
export const CLOSE_NOTEBOOK                 = "CLOSE_NOTEBOOK";
export const DISPOSE_CONTENT                = "DISPOSE_CONTENT";

export type ChangeContentName               = Action     <typeof CHANGE_CONTENT_NAME,           HasContent & HasFilepathChange>;
export type ChangeContentNameFulfilled      = Action     <typeof CHANGE_CONTENT_NAME_FULFILLED, HasContent & HasFilepathChange>;
export type ChangeContentNameFailed         = ErrorAction<typeof CHANGE_CONTENT_NAME_FAILED,    HasContent & HasFilepathChange & { basepath: string }>;
export type ChangeFilenameAction            = Action     <typeof CHANGE_FILENAME,               HasContent &  { filepath?: string }>;
export type NewNotebook                     = Action     <typeof NEW_NOTEBOOK,                  HasContent & HasKernel & { filepath: string | null; cwd: string; kernelSpec: KernelspecInfo }>;
export type CloseNotebook                   = Action     <typeof CLOSE_NOTEBOOK,                HasContent>;
export type DisposeContent                  = Action     <typeof DISPOSE_CONTENT,               HasContent>;

export const changeContentName              = makeActionFunction      <ChangeContentName>           (CHANGE_CONTENT_NAME);
export const changeContentNameFulfilled     = makeActionFunction      <ChangeContentNameFulfilled>  (CHANGE_CONTENT_NAME_FULFILLED);
export const changeContentNameFailed        = makeErrorActionFunction <ChangeContentNameFailed>     (CHANGE_CONTENT_NAME_FAILED);
export const changeFilename                 = makeActionFunction      <ChangeFilenameAction>        (CHANGE_FILENAME);
export const newNotebook                    = makeActionFunction      <NewNotebook>                 (NEW_NOTEBOOK);
export const closeNotebook                  = makeActionFunction      <CloseNotebook>               (CLOSE_NOTEBOOK);
export const disposeContent                 = makeActionFunction      <DisposeContent>              (DISPOSE_CONTENT);
