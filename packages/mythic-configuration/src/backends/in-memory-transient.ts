import { EMPTY } from "rxjs";
import { ConfigurationBackend } from "..";

export const inMemoryConfigurationBackend: ConfigurationBackend = {
  setup: () => EMPTY,
  load: () => EMPTY,
  save: (_current) => EMPTY,
};
