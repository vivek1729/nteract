# Execution Epics

## executeAllCellsEpic

This epics maps an `ExecuteAllCells` action to multiple `ExecuteCell` actions for each cell.

## executeFocusedCellEpic

This epic maps an `ExecuteFocusedCell` action to an `ExecuteCell` action.

## lazyLaunchKernelEpic

This epic is triggered the first time an `ExecuteCell` action is dispatched. If there is no kernel connected to the notebook, this epic will launch a kernel.

## executeCellEpic

This epic does one of two things when an `ExecuteCell` action is dispatched.

- If we are connected to a kernel, it immediately dispatches a `SendExecuteRequest` action.
- If there is no kernel connected, it stores the execution in the queue.

## executeCellAfterKernelLaunchEpic

This epic works alongside the `lazyLaunchKernelEpic`. When a kernel has been successfully launched, it dispatches a `SendExecuteRequest` action for each execution that is stored in the execution queue.

## sendExecuteRequestEpic

This epic listens to `SEND_EXECUTE_REQUESTS` and creates a new Observable that manages sending the execution request to the kernel and processing the responses. The Observable is unique per cell, so each cell will have its own Observable where requests and responses are processed.

## updateDisplayEpic

This epic subsribes to messages coming in from a kernel when it is launched. If one of the messages is of the `update_display_data` message type, it dispatches an `UpdateDisplay` action.

## sendInputReplyEpic

This epic processes sending response to `stdin` requests sent by the kernel. It listens to `SEND_INPUT_REPLY` actions which should be dispatched when a user provides a response to a `stdin` request in the UI.
