import React from "react";
import {
  Cells,
  CodeCell,
  MarkdownCell,
  RawCell
} from "@nteract/stateful-components";
import { ContentRef } from "@nteract/core";
import { ThemableNotifications } from "../derived-components/themable-notifications";

import CellToolbar from "../derived-components/toolbar";
import StatusBar from "../derived-components/status-bar";

interface ComponentProps {
  contentRef: ContentRef;
}

export default class NotebookApp extends React.Component<ComponentProps> {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <Cells contentRef={this.props.contentRef}>
          {{
            code: (props: { id: string; contentRef: ContentRef }) => (
              <CodeCell
                id={props.id}
                contentRef={props.contentRef}
                cell_type="code"
              >
                {{
                  toolbar: () => (
                    <CellToolbar id={props.id} contentRef={props.contentRef} />
                  )
                }}
              </CodeCell>
            ),
            markdown: (props: { id: string; contentRef: ContentRef }) => (
              <MarkdownCell
                id={props.id}
                contentRef={props.contentRef}
                cell_type="markdown"
              >
                {{
                  toolbar: () => (
                    <CellToolbar id={props.id} contentRef={props.contentRef} />
                  )
                }}
              </MarkdownCell>
            ),
            raw: (props: { id: string; contentRef: ContentRef }) => (
              <RawCell
                id={props.id}
                contentRef={props.contentRef}
                cell_type="raw"
              >
                {{
                  toolbar: () => (
                    <CellToolbar id={props.id} contentRef={props.contentRef} />
                  )
                }}
              </RawCell>
            )
          }}
        </Cells>
        <StatusBar contentRef={this.props.contentRef} />
        <ThemableNotifications/>
      </React.Fragment>
    );
  }
}
