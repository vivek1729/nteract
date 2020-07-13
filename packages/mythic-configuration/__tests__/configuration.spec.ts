import { makeConfigureStore } from "@nteract/myths";
import { List, Map } from "immutable";
import { of } from "rxjs";
import { configuration, ConfigurationBackend, createDeprecatedConfigOption, defineConfigOption, setConfigAtKey } from "../src";
import { loadConfig } from "../src/myths/load-config";
import { saveConfig } from "../src/myths/save-config";
import { setConfig } from "../src/myths/set-config";
import { setConfigBackend } from "../src/myths/set-config-backend";

const backend: ConfigurationBackend = {
  setup: () => of(loadConfig.create()),
  load: () => of(setConfig.create({ pets: "🐈🐈🐈🐕" })),
  save: jest.fn(),
};

describe("configuration", () => {
  test("calls the backend appropriately", () => {
    configuration.testMarbles(
      "abcd|",
      "ABC-|",
      {
        a: setConfigBackend.create(backend),
        b: setConfigAtKey.create({
          key: "catNames",
          value: ["Diamond", "Sapphire", "Onyx"],
        }),
        c: loadConfig.create(),
        d: saveConfig.create(),

        A: loadConfig.create(),
        B: saveConfig.create(),
        C: setConfig.create({ pets: "🐈🐈🐈🐕" }),
      },
      {
        backend,
        current: null,
      },
    );

    expect(backend.save).toBeCalledTimes(1);
  });

  test("works in isolation", () => {
    const store = makeConfigureStore()({
      packages: [configuration],
    })();

    store.dispatch(setConfigAtKey.create({
      key: "catNames",
      value: ["Diamond", "Sapphire", "Onyx"],
    }));

    const getConfig = configuration.createSelector(state => state.current);

    expect(getConfig(store.getState())).toEqual(
      Map({
        catNames: List(["Diamond", "Sapphire", "Onyx"]),
      })
    );
  });

  test("config options can get and set", () => {
    const {
      selector: catsAre,
      action: catsAreNow,
    } = defineConfigOption({
      key: "catsAre",
      label: "🐈🐈🐈🐈🐈🐈🐈",
      defaultValue: "awesome",
    });

    const store = makeConfigureStore()({
      packages: [configuration],
    })();

    expect(catsAre(store.getState()))
      .toBe("awesome");

    store.dispatch(catsAreNow("super fluffy, and also totally awesome"));

    expect(catsAre(store.getState()))
      .toBe("super fluffy, and also totally awesome");
  });

  test("deprecations set new options properly", () => {
    createDeprecatedConfigOption({
      key: "areCats",
      changeTo: (value) => ({
        "cats.are": value,
        "are.cats": value,
        "alsoHere": value,
      }),
    });

    const store = makeConfigureStore()({
      packages: [configuration],
    })();

    store.dispatch(setConfig.create({
      areCats: "cats",
      are: { cats: "cats?" },
    }));

    const getConfig = configuration.createSelector(state => state.current);

    expect(getConfig(store.getState())).toEqual(
      Map({
        cats: Map({ are: "cats" }),
        are: Map({ cats: "cats?" }),
        alsoHere: "cats",
      })
    );
  });
});
