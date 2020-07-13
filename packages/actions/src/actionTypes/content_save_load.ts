// tslint:disable:max-line-length
import { Action, ErrorAction, HasContent, HasFilepath, HasKernel, makeActionFunction, makeErrorActionFunction } from "../utils";

export const FETCH_CONTENT                  = "CORE/FETCH_CONTENT";
export const FETCH_CONTENT_FULFILLED        = "CORE/FETCH_CONTENT_FULFILLED";
export const FETCH_CONTENT_FAILED           = "CORE/FETCH_CONTENT_FAILED";
export const DOWNLOAD_CONTENT               = "CORE/DOWNLOAD_CONTENT";
export const DOWNLOAD_CONTENT_FULFILLED     = "CORE/DOWNLOAD_CONTENT_FULFILLED";
export const DOWNLOAD_CONTENT_FAILED        = "CORE/DOWNLOAD_CONTENT_FAILED";
export const SAVE                           = "SAVE";
export const SAVE_FULFILLED                 = "SAVE_FULFILLED";
export const SAVE_FAILED                    = "SAVE_FAILED";
export const SAVE_AS                        = "SAVE_AS";
export const SAVE_AS_FULFILLED              = "SAVE_AS_FULFILLED";
export const SAVE_AS_FAILED                 = "SAVE_AS_FAILED";

export type FetchContent                    = Action     <typeof FETCH_CONTENT,                 HasContent & HasKernel & HasFilepath & { params: object }>;
export type FetchContentFulfilled           = Action     <typeof FETCH_CONTENT_FULFILLED,       HasContent & HasKernel & HasFilepath & { model: any; created?: Date; lastSaved?: Date }>;
export type FetchContentFailed              = ErrorAction<typeof FETCH_CONTENT_FAILED,          HasContent & HasKernel & HasFilepath>;
export type DownloadContent                 = Action     <typeof DOWNLOAD_CONTENT,              HasContent>;
export type DownloadContentFulfilled        = Action     <typeof DOWNLOAD_CONTENT_FULFILLED,    HasContent>;
export type DownloadContentFailed           = ErrorAction<typeof DOWNLOAD_CONTENT_FAILED,       HasContent>;
export type Save                            = Action     <typeof SAVE,                          HasContent>;
export type SaveFulfilled                   = Action     <typeof SAVE_FULFILLED,                HasContent & { model: any }>;
export type SaveFailed                      = ErrorAction<typeof SAVE_FAILED,                   HasContent>;
export type SaveAs                          = Action     <typeof SAVE_AS,                       HasContent & HasFilepath>;
export type SaveAsFulfilled                 = Action     <typeof SAVE_AS_FULFILLED,             HasContent & { model: any }>;
export type SaveAsFailed                    = ErrorAction<typeof SAVE_AS_FAILED,                HasContent>;

export const fetchContent                   = makeActionFunction      <FetchContent>                (FETCH_CONTENT);
export const fetchContentFulfilled          = makeActionFunction      <FetchContentFulfilled>       (FETCH_CONTENT_FULFILLED);
export const fetchContentFailed             = makeErrorActionFunction <FetchContentFailed>          (FETCH_CONTENT_FAILED);
export const downloadContent                = makeActionFunction      <DownloadContent>             (DOWNLOAD_CONTENT);
export const downloadContentFulfilled       = makeActionFunction      <DownloadContentFulfilled>    (DOWNLOAD_CONTENT_FULFILLED);
export const downloadContentFailed          = makeErrorActionFunction <DownloadContentFailed>       (DOWNLOAD_CONTENT_FAILED);
export const save                           = makeActionFunction      <Save>                        (SAVE);
export const saveFulfilled                  = makeActionFunction      <SaveFulfilled>               (SAVE_FULFILLED);
export const saveFailed                     = makeErrorActionFunction <SaveFailed>                  (SAVE_FAILED);
export const saveAs                         = makeActionFunction      <SaveAs>                      (SAVE_AS);
export const saveAsFulfilled                = makeActionFunction      <SaveAsFulfilled>             (SAVE_AS_FULFILLED);
export const saveAsFailed                   = makeErrorActionFunction <SaveAsFailed>                (SAVE_AS_FAILED);
