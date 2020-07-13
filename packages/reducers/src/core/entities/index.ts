// Vendor modules
import { makeEntitiesRecord } from "@nteract/types";
import { combineReducers } from "redux-immutable";

// Local modules
import { comms } from "./comms";
import { contents } from "./contents";
import { hosts } from "./hosts";
import { kernels } from "./kernels";
import { kernelspecs } from "./kernelspecs";
import { messages } from "./messages";
import { modals } from "./modals";
import { sidebar } from "./sidebar";
import { transforms } from "./transforms";

export const entities = combineReducers(
  {
    comms,
    contents,
    hosts,
    kernels,
    kernelspecs,
    messages,
    modals,
    sidebar,
    transforms,
  },
  makeEntitiesRecord as any
);
