import { RootState } from "@nteract/myths";
import { Map } from "immutable";
import { Observable } from "rxjs";
import { loadConfig } from "./myths/load-config";
import { setConfig } from "./myths/set-config";
import { setConfigAtKey } from "./myths/set-config-at-key";

export type Configuration = Map<string, any>;

export interface ConfigurationBackend {
  setup: () => Observable<typeof loadConfig.action>;
  load: () => Observable<typeof setConfig.action>;
  save: (current: Configuration) => Observable<any>;
}

export interface ConfigurationState {
  backend: ConfigurationBackend;
  current: Configuration;
}

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

export interface ConfigurationOptionDeprecatedDefinition {
  key: string;
  changeTo: (value: any) => { [key: string]: any };
}

export interface ConfigurationOption<TYPE = any>
  extends ConfigurationOptionDefinition<TYPE> {

  value?: TYPE;
  selector: (state: {}) => TYPE;
  action: (value: TYPE) => typeof setConfigAtKey.action;
}

export type HasPrivateConfigurationState =
  RootState<"configuration", ConfigurationState>;
