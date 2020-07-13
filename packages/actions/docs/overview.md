# An Overview of the @nteract/actions Package

The `@nteract/actions` package is part of the nteract core SDK. You'll likely be using this package in conjuction with other packages in the core SDK, like `@nteract/selectors` and `@nteract/epics`.

### What are actions?

Actions are plain JavaScript objects with a well-defined schema. They exist as part of the [Redux](https://redux.js.org/) universe. For general information about actions, you can check out the [Redux docs](https://redux.js.org/basics/actions/).

### What role do actions play in the nteract core SDK?

Every event that happens in a nteract-based UI will generally map to an action. For example, adding a new cell to a notebook or setting the Jupyter host that the nteract-based application is currently connected to. These actions are picked up by reducers and epics that implement the functionality related to the action.

### What are action creators?

Action creators are functions that take a specific set of parameters and return an action. For example, let's say we have an ExecuteCell action with the following schema.

```
{
    type: "EXECUTE_CELL";
    payload: {
        contentRef: ContentRef;
        id: CellId;
    }
}
```

The action creator for this action would look like this.

```js
function executeCell({ contentRef, cellId }) {
    return {
       type: "EXECUTE_CELL";
        payload: {
            contentRef: ContentRef;
            id: CellId;
        }
    }
}
```

The `@nteract/actions` package exports a set of action creators for all the actions that nteract supports.

### Where are the actions documented?

You can find a list of all the support actions [in the API docs for this package](https://packages.nteract.io/modules/actions.html).
