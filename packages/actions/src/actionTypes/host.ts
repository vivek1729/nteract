// tslint:disable:max-line-length
import { HostRecord } from "@nteract/types";
import { Action, HasHost, makeActionFunction } from "../utils";

export const ADD_HOST         = "CORE/ADD_HOST";
export const REMOVE_HOST      = "CORE/REMOVE_HOST";
export const SET_APP_HOST     = "SET_APP_HOST";

export type AddHost           = Action<typeof ADD_HOST,       HasHost &  { host: HostRecord }>;
export type RemoveHost        = Action<typeof REMOVE_HOST,    HasHost>;
export type SetAppHostAction  = Action<typeof SET_APP_HOST,   { host: HostRecord }>;

export const addHost          = makeActionFunction<AddHost>         (ADD_HOST);
export const removeHost       = makeActionFunction<RemoveHost>      (REMOVE_HOST);
export const setAppHost       = makeActionFunction<SetAppHostAction>(SET_APP_HOST);
