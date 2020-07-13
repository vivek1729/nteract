import { Callout, Intent, Spinner, Toaster } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import { NotificationMessage, NotificationSystem } from "../types";

const FloatRight = styled.div`
  float: right;
`;

const calloutStyle = {
  margin: "-11px 0 -11px -11px",
  background: "transparent",
};

export const blueprintjsNotificationSystem =
  (toaster: Toaster): NotificationSystem => ({
    addNotification: (msg: NotificationMessage) => {
      const intent = {
        "in-progress": Intent.PRIMARY,
        info: Intent.PRIMARY,
        success: Intent.SUCCESS,
        warning: Intent.WARNING,
        error: Intent.DANGER,
      }[msg.level ?? "info"];

      toaster.show({
        message: (
          <>
            {msg.level === "in-progress"
              ? <FloatRight>
                  <Spinner size={20} intent={intent}/>
                </FloatRight>
              : null}
            <Callout
              icon={msg.icon}
              title={msg.title}
              intent={intent}
              style={calloutStyle}
            >
              {msg.message}
            </Callout>
          </>
        ),
        action: msg.action
          ? {
              icon: msg.action.icon ?? "arrow-right",
              text: msg.action.label,
              onClick: msg.action.callback,
            }
          : undefined,
        timeout: msg.action || msg.level === "in-progress"
          ? 0
          : 10_000,
      }, msg.key);
    },
  });
