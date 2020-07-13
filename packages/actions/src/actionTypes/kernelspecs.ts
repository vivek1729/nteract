// tslint:disable:max-line-length
import { KernelspecInfo, KernelspecProps } from "@nteract/types";
import { Action, ErrorAction, HasContent, HasHost, HasKernelspecs, makeActionFunction, makeErrorActionFunction } from "../utils";

export const FETCH_KERNELSPECS            = "CORE/FETCH_KERNELSPECS";
export const FETCH_KERNELSPECS_FULFILLED  = "CORE/FETCH_KERNELSPECS_FULFILLED";
export const FETCH_KERNELSPECS_FAILED     = "CORE/FETCH_KERNELSPECS_FAILED";
export const SET_KERNELSPEC_INFO          = "SET_KERNELSPEC_INFO";

export type FetchKernelspecs              = Action     <typeof FETCH_KERNELSPECS,           HasKernelspecs & HasHost>;
export type FetchKernelspecsFulfilled     = Action     <typeof FETCH_KERNELSPECS_FULFILLED, HasKernelspecs & HasHost & { defaultKernelName: string; kernelspecs: { [kernelspec: string]: KernelspecProps } }>;
export type FetchKernelspecsFailed        = ErrorAction<typeof FETCH_KERNELSPECS_FAILED,    HasKernelspecs>;
export type SetKernelspecInfo             = Action     <typeof SET_KERNELSPEC_INFO,         HasContent & { kernelInfo: KernelspecInfo }>; // "legacy" action that pushes kernelspec info back up for the notebook document

export const fetchKernelspecs             = makeActionFunction     <FetchKernelspecs>         (FETCH_KERNELSPECS);
export const fetchKernelspecsFulfilled    = makeActionFunction     <FetchKernelspecsFulfilled>(FETCH_KERNELSPECS_FULFILLED);
export const fetchKernelspecsFailed       = makeErrorActionFunction<FetchKernelspecsFailed>   (FETCH_KERNELSPECS_FAILED);
export const setKernelspecInfo            = makeActionFunction     <SetKernelspecInfo>        (SET_KERNELSPEC_INFO);
