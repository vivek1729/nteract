# @nteract/actions

This package contains definitions of constants and action creators that can be used to create Redux actions in your nteract application. These actions can be dispatch to create new cells, launch kernels, create new notebooks, execute cells, and much more. To see this package in action, you can view the source code for the [@nteract/epics](https://github.com/nteract/nteract/tree/master/packages/epics) and [@nteract/core](https://github.com/nteract/nteract/tree/master/packages/core) packages.

## Installation

```
$ yarn add @nteract/actions
```

```
$ npm install --save @nteract/actions
```

## Usage

The Redux reducer below shows how we can leverage the actions and action types in this package to create a reducer for managing the status of a save event.

```javascript
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

## Documentation

You can view the reference documentation for `@nteract/actions` in the [package docs](https://packages.nteract.io/modules/actions.html).

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/nteract/nteract/issues/new/choose) and add the `pkg:actions` label.

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
