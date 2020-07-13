# What is @nteract/core?

@nteract/core is where the magic happens. The package, by itself, is nothing special. It encapsulates five other nteract packages that are designed to be used together.

- `@nteract/actions`
- `@nteract/reducers`
- `@nteract/epics`
- `@nteract/types`
- `@nteract/selectors`

Instead of installing and importing from each individual package above, it is recommend that you install `@nteract/core` and use each module like so.

```js
import { actions } from "@nteract/core"; // For actions
import { reducers } from "@nteract/core"; // For reducers
import { epics } from "@nteract/core"; // For epics
import { state } from "@nteract/core"; // For types
import { selectors } from "@nteract/core"; // For selectors
```

You can also import individually exported elements from `@nteract/core`. For example, if you want to use the `createContentRef` function from the `@nteract/types` package, you can import it like so from the core package.

```js
import { createContentRef } from "@nteract/core";
```

## Key Principles Behind @nteract/core

The `@nteract/core` package is heavily dependent on the underlying technologies powering nteract, namely Redux and RxJS. Each module exported from the core package is designed to work with the other. Here's how it all flows.

1. One of the key principles behind nteract is the existence of a client-side state model. This client-side model makes it easy to manage the state of the nteract client and to synchronize it with a back-end system. You can learn more about the state in the documentation for the `@nteract/types` package.
2. Redux actions are dispatched from nteract clients. Function creators and type definitions for these actions are exported from the `actions` module. For example, if we wanted to focus a particularly cell in a notebook, we can dispatch a `FocusCell` action.
3. Reducers are functions that make immutable changes to the state. Reducers take a base state and an action as inputs. Depending on the action, the base state will be copied and modified in a particular way. For example, a `FocusCell` action will update the `cellFocused` property for a particular content model in the state.
4. Epics bring RxJS and Redux together. They allow developers to implement functions that listen to actions and dispatch async requests or execute side-effects. For example, epics exported from the `epics` module handle cell execution targeting a Jupyter kernel and content fetching from a Jupyter server.
5. The state model has several useful properties, like the currently focused cell or the filepath of a content. The `selectors` module exports a set of selectors, functions that take an input state and return a particular state property.

### More Information

For more information on each component of the core SDK, visit the documentation pages for each module.
