import { Classes, Toaster } from "@blueprintjs/core";
import { MythicComponent } from "@nteract/myths";
import React, { RefObject } from "react";
import styled from "styled-components";
import { blueprintjsNotificationSystem } from "../backends/blueprintjs";
import { notifications } from "../package";
import { NotificationSystem } from "../types";

const initializeSystem =
  notifications.createMyth("initializeSystem")<NotificationSystem>({
    reduce: (state, action) =>
      state.set("current", action.payload),
  });

const DoNotPrint =
  styled.div`
    @media print {
      display: none;
    }
  `;

export const NotificationRoot =
  initializeSystem.createConnectedComponent(
    "NotificationRoot",
    class extends MythicComponent<
      typeof initializeSystem,
      { darkTheme?: boolean }
    > {
      toaster?: RefObject<Toaster>;

      postConstructor(): void {
        this.toaster = React.createRef();
      }

      componentDidMount(): void {
        this.props.initializeSystem(
          blueprintjsNotificationSystem(this.toaster!.current!)
        );
      }

      render(): JSX.Element {
        return (
          <DoNotPrint>
            <Toaster
              ref={this.toaster}
              position={"top-right"}
              className={this.props.darkTheme ? Classes.DARK : undefined}
              usePortal={false}   // needed for the theme class to bubble down
            />
          </DoNotPrint>
        );
      }
    },
  );
