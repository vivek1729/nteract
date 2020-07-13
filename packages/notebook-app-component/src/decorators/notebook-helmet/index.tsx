import * as selectors from "@nteract/selectors";
import { AppState, ContentRef } from "@nteract/types";
import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

interface ComponentProps {
  contentRef: ContentRef;
}

interface StateProps {
  filePath: string | null;
}

export class NotebookHelmet extends React.PureComponent<
  StateProps & ComponentProps
> {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <Helmet>
          <base href={this.props.filePath || "."} />
        </Helmet>
      </React.Fragment>
    );
  }
}

const makeMapStateToProps = (
  initialState: AppState,
  initialProps: ComponentProps
): ((state: AppState) => StateProps) => {
  const { contentRef } = initialProps;

  const mapStateToProps = (state: AppState) => {
    const filePath = selectors.filepath(state, { contentRef });
    return {
      filePath,
    };
  };

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(NotebookHelmet);
