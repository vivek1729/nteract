# What is @nteract/epics?

Epics are functions that take a stream of Redux actions as inputs and return a stream of Redux actions as outputs. The best place to learn about epics is in [the documentation for redux-observable](https://redux-observable.js.org/docs/basics/Epics.html).

The nteract core SDK exports a set of epics that you can register in the middleware of your Redux store. When registered, these epics will be "active" and run when certain actions occur. If you don't want the functionality of a particular epic, you can unregister it from your Redux store.

Documentation on each of the epics is listed under the `@nteract/epics` tab by category.
