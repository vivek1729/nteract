# @nteract/mythic-configuration

This package implements a configuration system.

## Installation

```
$ yarn add @nteract/mythic-configuration
```

```
$ npm install --save @nteract/mythic-configuration
```

## Usage

Initialize the package by including the `configuration` package. Per default it will save the configuration in memory.
If you would like to use a config file, you can dispatch a `setConfigFile` action:

```javascript
import { configuration } from "@nteract/mythic-configuration";
import { makeConfigureStore } from "@nteract/myths";

export const configureStore = makeConfigureStore({
  packages: [configuration],
});

store.dispatch(setConfigFile("/etc/app.conf"));
```

The package will use that file to save any configuration options. The file is also watched and loaded when it changes.

After this initialisation, you can then work with configuration options:

```javascript
export const {
  selector: tabSize,
  action: setTabSize,
} = defineConfigOption({
  label: "Tab Size",
  key: "codeMirror.tabSize",
  values: [
    {label: "2 Spaces", value: 2},
    {label: "3 Spaces", value: 3},
    {label: "4 Spaces", value: 4},
  ],
  defaultValue: 4,
});

const currentValue = tabSize(store.getState());

store.dispatch(setTabSize(2));
```

To get an object from all config options with a common prefix, use `createConfigCollection`:
```javascript
const codeMirrorConfig = createConfigCollection({
  key: "codeMirror",
});
```
Now `codeMirrorConfig()` will give you e.g. with above option `{tabSize: 4}`, with default values properly handled. 

You can also get all options:
```javascript
import { allConfigOptions } from "@nteract/mythic-configuration";

const options = allConfigOptions();
const optionsWithCurrentValues = allConfigOptions(store.getState());
```

In case you want to change the key of a config option, you can deprecate the old key:
```javascript
createDeprecatedConfigOption({
  key: "cursorBlinkRate",
  changeTo: (value: number) => ({
    "codeMirror.cursorBlinkRate": value,
  }),
});
```

This will change the old key to the new key, unless the new key already has a value.

## API

```typescript
import { RootState } from "@nteract/myths";
import { ConfigurationState, setConfigAtKey } from "@nteract/mythic-configuration";

export interface ConfigurationOptionDefinition<TYPE = any> {
  label: string;
  key: string;
  defaultValue: TYPE;
  valuesFrom?: string;
  values?: Array<{
    label: string;
    value: TYPE;
  }>;
}

export interface ConfigurationOption<TYPE = any>
  extends ConfigurationOptionDefinition<TYPE> {

  value?: TYPE;
  selector: (state: HasPrivateConfigurationState) => TYPE;
  action: (value: TYPE) => typeof setConfigAtKey.action;
}

export type HasPrivateConfigurationState =
  RootState<"configuration", ConfigurationState>;
```

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/nteract/nteract/issues/new/choose) and add the `pkg:mythic-configuration` label.

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
