import * as actions from "@nteract/actions";

import { modalType } from "../../../src/core/entities/modals";

describe("modalType", () => {
  it("sets modal name on open modal", () => {
    const originalState = "";
    const action = actions.openModal({ modalType: "About" });
    const state = modalType(originalState, action);
    expect(state).toEqual("About");
  });
  it("clear modal name on close modal", () => {
    const originalState = "About";
    const action = actions.closeModal();
    const state = modalType(originalState, action);
    expect(state).toEqual("");
  });
});
