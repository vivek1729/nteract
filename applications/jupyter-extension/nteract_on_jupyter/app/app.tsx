import { ContentRef } from "@nteract/core";
import * as React from "react";

import { default as Contents } from "./contents";

class App extends React.Component<{ contentRef: ContentRef }> {
  shouldComponentUpdate(nextProps: { contentRef: ContentRef }): boolean {
    return nextProps.contentRef !== this.props.contentRef;
  }

  render(): JSX.Element {
    return (
      <Contents contentRef={this.props.contentRef} />
    );
  }
}

export default App;
