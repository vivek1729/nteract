import * as actions from "@nteract/actions";
import Immutable from "immutable";

import { messageQueue } from "../../../src/core/entities/messages";

describe("messageQueue", () => {
  it("adds an action to the queue", () => {
    const originalState = Immutable.List([]);
    const action = actions.enqueueAction({
      id: "cellId",
      contentRef: "contentRef"
    });
    const state = messageQueue(originalState, action);
    expect(state.getIn([0, "payload", "id"])).toBe("cellId");
    expect(state.getIn([0, "payload", "contentRef"])).toBe("contentRef");
  });
  it("can clear the queue", () => {
    const originalState = Immutable.List([
      actions.enqueueAction({
        id: "cellId",
        contentRef: "contentRef"
      }),
      actions.enqueueAction({
        id: "cellId",
        contentRef: "contentRef"
      })
    ]);
    const action = actions.clearMessageQueue();
    const state = messageQueue(originalState, action);
    expect(state.size).toBe(0);
  });
});
