# myths (currently: @nteract/myths, TBC)

**This is a pre-alpha level package; interfaces are not stable yet!**

This framework allows for integrating sets of closely related actions, reducers and epics while mainting high DRY and minimizing dependencies. It provides for a structured way to avoid boilerplate. 

## Installation

```
$ yarn add myths
```

```
$ npm install --save myths
```

## Usage

First, create a `MythicPackage` with a name, a type for its private state, and the initial state:

```typescript
export const iCanAdd = createMythicPackage("iCanAdd")<
  {
    sum: number;
  }
>({
  initialState: {
    sum: 0,
  },
});
```

You can the use the package to create a `Myth`, again with a name, a type for its payload and optionally a reducer operating on its package's private state:

```typescript
export const addToSum =
  iCanAdd.createMyth("addToSum")<number>({
    reduce: (state, action) =>
      state.set("sum", state.get("sum") + action.payload),
  });
```

A package can have any number of myths. To create an action based on a myth, use its create function. You can then dispatch this action normally:

```typescript
store.dispatch(addToSum.create(8));
```

You get a store from a set of mythic packages, which has all the appropriate reducers and epics already in place:

```typescript
type NonPrivateState = { foo: string };
const configureStore = makeConfigureStore<NonPrivateState>()({
  packages: [
    iCanAdd,
  ],
});
export const store = configureStore({ foo: "bar" });
```

## Epic Definitions

To define epics there are two different shorthand definitions available:

```typescript
export const addToSum =
  iCanAdd.createMyth("addToSum")<number>({

    reduce: (state, action) =>
      state.set("sum", state.get("sum") + action.payload),

    thenDispatch: [
      (action, state) =>
        state.get("sum") - action.payload < 100 && 100 <= state.get("sum")
          ? of(sendNotification.create({message: "Just passed 100!"}))
          : EMPTY,
    ],

    andAlso: [
      {
        // Half the sum every time an error action happens
        when: action => action.error ?? false,
        dispatch: (action, state, addToSum_) =>
          of(addToSum_.create(-state.get("sum") / 2)),
      },
    ],

  });
```

Use `thenDispatch: []` to define actions then should be dispatched when actions of the type defined are dispatched, and `andAlso: []` to
generate actions based on a custom predicate. Since the type being defined is not available for reference yet, it is
passed as third argument to the dispatch function.
 
## Testing

To test the actions of a mythic package, you can use the `testMarbles(...)` method. Note that this only tests the epics,
without evaluating reducers.

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/nteract/nteract/issues/new/choose) and add the `pkg:myths` label.

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
