import { createMythicPackage } from "@nteract/myths";
import { Map } from "immutable";
import { inMemoryConfigurationBackend } from "./backends/in-memory-transient";
import { ConfigurationState } from "./types";

export const configuration =
  createMythicPackage("configuration")<ConfigurationState>({
    initialState: {
      backend: inMemoryConfigurationBackend,
      current: Map(),
    }
  });
