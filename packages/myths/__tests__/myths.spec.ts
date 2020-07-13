import { EMPTY, of } from "rxjs";
import { createMythicPackage, makeConfigureStore } from "../src";

const iCanAdd = createMythicPackage("iCanAdd")<
  {
    sum: number;
  }
  >({
  initialState: {
    sum: 0,
  },
});

const addToSum =
  iCanAdd.createMyth("addToSum")<number>({
    reduce: (state, action) =>
      state.set("sum", state.get("sum") + action.payload),
    andAlso: [
      {
        when: action => action.error ?? false,
        dispatch: (action, state, addToSum_) =>
          of(addToSum_.create(-state.get("sum") / 2)),
      }
    ],
  });

const incrementIfSmallerThan =
  iCanAdd.createMyth("incrementIfSmallerThan")<number>({
    thenDispatch: [
      (action, state) =>
        state.get("sum") < action.payload
          ? of(addToSum.create(1))
          : EMPTY,
    ],
  });

const sumIs = iCanAdd.createMyth("sumIs")<number>({});

const publishSum = iCanAdd.createMyth("publishSum")<null>({
  thenDispatch: [
    (action, state) =>
      of(sumIs.create(state.get("sum"))),
  ],
});

const selectSum = iCanAdd.createSelector(state => state.sum);

const configureStore = makeConfigureStore()({
  packages: [
    iCanAdd,
  ],
});

describe("myths", () => {
  test("can create a mythic package and use it to alter state", () => {
    const store = configureStore();
    store.dispatch(addToSum.create(8));
    store.dispatch(addToSum.create(15));
    store.dispatch(addToSum.create(19));

    expect(selectSum(store.getState())).toEqual(42);
  });

  test("can run epics", () => {
    iCanAdd.testMarbles(
      "abcdef|",
      "-B-DEF|",
      {
        a: addToSum.create(8),
        b: { type: "MyError", error: true, payload: {} },
        c: addToSum.create(19),
        d: incrementIfSmallerThan.create(42),
        e: incrementIfSmallerThan.create(24),
        f: publishSum.create(null),

        B: addToSum.create(-0),
        D: addToSum.create(1),
        E: addToSum.create(1),
        F: sumIs.create(0),
        // TODO: figure out how to add ability to evaluate reducers in a
        //       marble test
        // Then the above should be:
        // B: addToSum.create(-4)
        // D: addToSum.create(1)
        // no emission on E
        // F: sumIs.create(24)
      }
    );
  });
});
