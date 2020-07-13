// tslint:disable:max-line-length
import { Action, HasCell, makeActionFunction, MaybeHasCell } from "../utils";

export const FOCUS_CELL                     = "FOCUS_CELL";
export const FOCUS_NEXT_CELL                = "FOCUS_NEXT_CELL";
export const FOCUS_PREVIOUS_CELL            = "FOCUS_PREVIOUS_CELL";
export const FOCUS_CELL_EDITOR              = "FOCUS_CELL_EDITOR";
export const FOCUS_NEXT_CELL_EDITOR         = "FOCUS_NEXT_CELL_EDITOR";
export const FOCUS_PREVIOUS_CELL_EDITOR     = "FOCUS_PREVIOUS_CELL_EDITOR";

export type FocusCell                       = Action<typeof FOCUS_CELL,                 HasCell>;
export type FocusNextCell                   = Action<typeof FOCUS_NEXT_CELL,            MaybeHasCell & { createCellIfUndefined: boolean }>;
export type FocusPreviousCell               = Action<typeof FOCUS_PREVIOUS_CELL,        MaybeHasCell>;
export type FocusCellEditor                 = Action<typeof FOCUS_CELL_EDITOR,          MaybeHasCell>;
export type FocusNextCellEditor             = Action<typeof FOCUS_NEXT_CELL_EDITOR,     MaybeHasCell>;
export type FocusPreviousCellEditor         = Action<typeof FOCUS_PREVIOUS_CELL_EDITOR, MaybeHasCell>;

export const focusCell                      = makeActionFunction<FocusCell>               (FOCUS_CELL);
export const focusNextCell                  = makeActionFunction<FocusNextCell>           (FOCUS_NEXT_CELL);
export const focusPreviousCell              = makeActionFunction<FocusPreviousCell>       (FOCUS_PREVIOUS_CELL);
export const focusCellEditor                = makeActionFunction<FocusCellEditor>         (FOCUS_CELL_EDITOR);
export const focusNextCellEditor            = makeActionFunction<FocusNextCellEditor>     (FOCUS_NEXT_CELL_EDITOR);
export const focusPreviousCellEditor        = makeActionFunction<FocusPreviousCellEditor> (FOCUS_PREVIOUS_CELL_EDITOR);
