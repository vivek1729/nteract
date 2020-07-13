# @nteract/selectors

This package provides a set of selectors and functions that allow you to extract important information from the state of your nteract application. To see a full set of the data stored in application state that be extracted with this package, you can view the AppState type.

## Installation

```
$ yarn add @nteract/selectors
```

```
$ npm install --save @nteract/selectors
```

## Usage

```javascript
import { modalType, currentTheme } from "@nteract/selectors";

const state = {
  config: {
    theme: "dark"
  },
  core: {
    entities: {
      modals: {
        modalType: "ABOUT"
      }
    }
  }
};

const theme = currentTheme(state);
const currentModal = modalType(state);
console.log(`Rendering ${currentModal} modal using ${theme} theme.`);
> Rendering ABOUT modal using dark theme.
```

## Documentation

You can view the reference documentation for `@nteract/selectors` in the [package docs](https://packages.nteract.io/modules/selectors.html).

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/nteract/nteract/issues/new/choose) and add the `pkg:selectors` label.

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
