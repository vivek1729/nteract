import { shallow } from "enzyme";
import * as Immutable from "immutable";
import React from "react";
import renderer from "react-test-renderer";

import {
  makeMapStateToProps,
  PureNewNotebookNavigation
} from "../src/new-notebook-navigation";
import Logo from "../src/new-notebook-navigation/logos";

describe("NewNotebookNavigation", () => {
  test("snapshots", () => {
    const availableNotebooks = [
      {
        kernelspec: {
          name: "python3",
          language: "python",
          displayName: "Python 3",
          metadata: Immutable.Map(),
          env: Immutable.Map(),
          argv: Immutable.List(),
          resources: Immutable.Map(),
          interruptMode: "yes"
        }
      },
      {
        kernelspec: {
          name: "scala211",
          language: "scala",
          displayName: "Scala 2.11",
          metadata: Immutable.Map(),
          env: Immutable.Map(),
          argv: Immutable.List(),
          resources: Immutable.Map(),
          interruptMode: "yes"
        }
      },
      {
        kernelspec: {
          name: "python2",
          language: "python",
          displayName: "Python 2",
          metadata: Immutable.Map(),
          env: Immutable.Map(),
          argv: Immutable.List(),
          resources: Immutable.Map(),
          interruptMode: "yes"
        }
      }
    ];

    const selectKernelspec = jest.fn();

    const component = renderer.create(
      <PureNewNotebookNavigation
        availableNotebooks={availableNotebooks}
        onClick={selectKernelspec}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("makeMapStateToProps", () => {
  it("returns a list of kernelspecs sorted by language", () => {
    const state = {
      core: {
        entities: {
          kernelspecs: {
            byRef: Immutable.Map({
              someRef: {
                byName: Immutable.Map({
                  python2: {
                    name: "python2",
                    language: "python",
                    displayName: "Python 2",
                    metadata: Immutable.Map(),
                    env: Immutable.Map(),
                    argv: Immutable.List(),
                    resources: Immutable.Map(),
                    interruptMode: "yes"
                  },
                  scala211: {
                    name: "scala211",
                    language: "scala",
                    displayName: "Scala 2.11",
                    metadata: Immutable.Map(),
                    env: Immutable.Map(),
                    argv: Immutable.List(),
                    resources: Immutable.Map(),
                    interruptMode: "yes"
                  },
                  python3: {
                    name: "python3",
                    language: "python",
                    displayName: "Python 3",
                    metadata: Immutable.Map(),
                    env: Immutable.Map(),
                    argv: Immutable.List(),
                    resources: Immutable.Map(),
                    interruptMode: "yes"
                  }
                })
              }
            })
          }
        }
      }
    };
    const result = makeMapStateToProps({
      core: { entities: { kernelspecs: {} } }
    })(state);
    expect(result.availableNotebooks.map(item => item.kernelspec.name)).toEqual(
      Immutable.List(["python2", "python3", "scala211"])
    );
  });
});

describe("Logo", () => {
  it("can render JavaScript logos", () => {
    const component = shallow(<Logo language="javascript" />);
    expect(component.isEmptyRender()).toBe(false);
  });
  it("can render R logos", () => {
    const component = shallow(<Logo language="r" />);
    expect(component.isEmptyRender()).toBe(false);
  });
  it("can render Scala logos", () => {
    const component = shallow(<Logo language="scala" />);
    expect(component.isEmptyRender()).toBe(false);
  });
  it("can render placholder logos", () => {
    const component = shallow(<Logo language="c#" />);
    expect(component.isEmptyRender()).toBe(false);
  });
});
