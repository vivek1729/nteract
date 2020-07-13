# @nteract/actions Examples

## Using @nteract/actions in reducers

The `@nteract/actions` package expose a type interface for each action and a constant for each action type. You can use these exported properties as in the example below.

In the example below, `Save`, `SaveFulfilled`, and `SaveFailed` are type interfaces for the action. `SAVE`, `SAVE_FULFILLED`, and `SAVE_FAILED` are constant type definitions.

```js
import actions from "@nteract/actions";

export default function myReducer(
  state: MyState,
  action: actions.Save | actions.SaveFulfilled | actions.SaveFailed
) {
  switch (action.type) {
    case actions.SAVE:
      return { ...state, status: "saving" };
    case actions.SAVE_FULFILLED:
      return { ...state, status: "success" };
    case actions.SAVE_FAILED:
      return { ...state, status: "failed" };
    default:
      return state;
  }
}
```

## Using @nteract/actions in React components

`@nteract/actions` can be used in conjunction with the `react-redux` package to dispatch actions from React components. For example, let's say you want to add a button to your user interface that will close the notebook when clicked. Here is how you would implement it.

```js
import React from "react";
import actions from "@nteract/actions";
import { ContentRef } from "@nteract/types";

interface ComponentProps {
    contentRef: ContentRef;
}

class CloseButton extends React.Component {
  render() {
    return <button onClick={this.props.closeNotebook}>Close</button>;
  }
}

const mapDispatchToProps = (dispatch, ownProps) =? {
    const { contentRef } = ownProps;
    return {
        closeNotebook: dispatch(actions.closeNotebook({ contentRef }))
    };
}

export default connect(null, mapDispatchToProps)(CloseButton)
```

## Using @nteract/actions in redux-observable epics

[Epics](https://redux-observable.js.org/docs/basics/Epics.html) are functions that take streams of Redux actions as inputs and return streams of Redux actions as outputs. You can use `@nteract/actions` in your custom epics to listen to actions dispatched from nteract-based applications and dispatch your own events.

In the example below, we listen to the `CloseNotebook` action and map it to a custom action.

```js
import { ofType } from "redux-observable";
import { mapTo } from "rxjs/operators";
import actions from "@nteract/actions"l

const mapCloseNotebook = action$ =>
  action$.pipe(
    ofType(actions.CLOSE_NOTEBOOK),
    mapTo({
      type: "MY_CLOSE_NOTEBOOK",
      payload: { message: "Notebook closed. " }
    })
  );
```
