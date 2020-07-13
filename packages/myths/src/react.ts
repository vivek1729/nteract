import React from "react";
import { connect } from "react-redux";
import { ConnectedComponentProps, Myth } from "./types";

export class MythicComponent<MYTH extends Myth, PROPS = {}>
  extends React.PureComponent<ConnectedComponentProps<
    MYTH["name"],
    MYTH["props"],
    PROPS
  >> {
  constructor(props: ConnectedComponentProps<
    MYTH["name"],
    MYTH["props"],
    PROPS
  >) {
    super(props);
    this.postConstructor();
  }

  postConstructor(): void {
    // Override in subclasses
  };
}

export const makeCreateConnectedComponent =
  <MYTH extends Myth>(myth: MYTH): typeof myth.createConnectedComponent => {
    return (
      (componentName, cls, makeState) => {
        const component = connect(
          makeState ?? null,
          { [myth.name]: myth.create },
        )(cls as any);
        component.displayName = componentName;
        return component;
      }
    );
  }
