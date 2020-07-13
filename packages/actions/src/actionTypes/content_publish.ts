// tslint:disable:max-line-length
import { BookstoreDataModel } from "@nteract/types";
import { Action, ErrorAction, HasContent, makeActionFunction, makeErrorActionFunction } from "../utils";

export const PUBLISH_TO_BOOKSTORE             = "CORE/PUBLISH_TO_BOOKSTORE";
export const PUBLISH_TO_BOOKSTORE_AFTER_SAVE  = "CORE/PUBLISH_TO_BOOKSTORE_AFTER_SAVE";
export const PUBLISH_TO_BOOKSTORE_SUCCEEDED   = "CORE/PUBLISH_TO_BOOKSTORE_SUCCEEDED";
export const PUBLISH_TO_BOOKSTORE_FAILED      = "CORE/PUBLISH_TO_BOOKSTORE_FAILED";
export const PUBLISH_GIST                     = "CORE/PUBLISH_GIST";

export type PublishToBookstore                =      Action<typeof PUBLISH_TO_BOOKSTORE,             HasContent>;
export type PublishToBookstoreAfterSave       =      Action<typeof PUBLISH_TO_BOOKSTORE_AFTER_SAVE,  HasContent & { model: BookstoreDataModel }>;
export type PublishToBookstoreSucceeded       =      Action<typeof PUBLISH_TO_BOOKSTORE_SUCCEEDED,   HasContent>;
export type PublishToBookstoreFailed          = ErrorAction<typeof PUBLISH_TO_BOOKSTORE_FAILED,      HasContent>;
export type PublishGist                       = Action     <typeof PUBLISH_GIST,                     HasContent>;

export const publishToBookstore               = makeActionFunction      <PublishToBookstore>          (PUBLISH_TO_BOOKSTORE);
export const publishToBookstoreAfterSave      = makeActionFunction      <PublishToBookstoreAfterSave> (PUBLISH_TO_BOOKSTORE_AFTER_SAVE);
export const publishToBookstoreSucceeded      = makeActionFunction      <PublishToBookstoreSucceeded> (PUBLISH_TO_BOOKSTORE_SUCCEEDED);
export const publishToBookstoreFailed         = makeErrorActionFunction <PublishToBookstoreFailed>    (PUBLISH_TO_BOOKSTORE_FAILED);
export const publishGist                      = makeActionFunction      <PublishGist>                 (PUBLISH_GIST);
