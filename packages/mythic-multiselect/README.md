# @nteract/mythic-multiselect

This package implements a simple method of keeping track of multiple selected cells using the `myths` framework.

## Installation

```
$ yarn add @nteract/mythic-multiselect
```

```
$ npm install --save @nteract/mythic-multiselect
```

## Usage

Initialize the package by including the `notifications` package in your store and rendering the `<NotificationsRoot/>`:

```javascript
import {
  multiselect,
  selectCell,
  unselectCell,
  clearSelectedCells,
} from "@nteract/mythic-multiselect";

store.dispatch(
  selectCell({
    contentRef: "content",
    id: "cellID",
  })
);
```

## API

```typescript
```

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/nteract/nteract/issues/new/choose) and add the `pkg:mythic-multiselect` label.

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
