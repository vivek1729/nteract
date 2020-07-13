import * as actions from "@nteract/actions";
import Immutable from "immutable";

import { byId, displayOrder } from "../../../src/core/entities/transforms";

describe("displayOrder", () => {
  it("can add a media type to the beginning of a list", () => {
    const originalState = Immutable.List(["text/plain"]);
    const action = actions.addTransform({
      mediaType: "text/html",
      component: () => {}
    });
    const state = displayOrder(originalState, action);
    expect(state).toEqual(Immutable.List(["text/html", "text/plain"]));
  });
  it("removes a media type from the list", () => {
    const originalState = Immutable.List(["text/html", "text/plain"]);
    const action = actions.removeTransform({
      mediaType: "text/html"
    });
    const state = displayOrder(originalState, action);
    expect(state).toEqual(Immutable.List(["text/plain"]));
  });
});

describe("byId", () => {
  it("can add a media type to the list of registered transforms", () => {
    const originalState = Immutable.Map();
    const component = () => null;
    const action = actions.addTransform({
      mediaType: "text/html",
      component
    });
    const state = byId(originalState, action);
    expect(state.get("text/html")).toBe(component);
  });
  it("removes a media type from the list", () => {
    const component = () => null;
    const originalState = Immutable.Map({ "text/html": component });
    const action = actions.removeTransform({
      mediaType: "text/html"
    });
    const state = byId(originalState, action);
    expect(state.get("text/html")).toBeUndefined();
  });
});
