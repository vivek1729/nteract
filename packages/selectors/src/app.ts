import { AppState } from "@nteract/types";

/**
 * Returns the version of the nteract application.
 */
export const appVersion = (state: AppState) => state.app.version;
