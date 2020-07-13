import React from "react";
import { mount } from "enzyme";

import { BareUndoableCellDelete } from "../../src/decorators/undoable/undoable-cell-delete";
import { TimedUndoableDelete } from "../../src/decorators/undoable/undoable-delete";

describe("UndoableCellDelete", () => {
  it("does not display undo button if cell is not deleting", () => {
    const component = mount(
      <BareUndoableCellDelete
        isDeleting={false}
        secondsDelay={1}
        doDelete={() => {}}
        id={"id"}
        contentRef={"contentRef"}
        doUndo={() => {}}
      >
        <p>test</p>
      </BareUndoableCellDelete>
    );
    expect(component.find(TimedUndoableDelete)).toHaveLength(0);
  });
  it("displays undo button if cell is deleting", () => {
    const component = mount(
      <BareUndoableCellDelete
        isDeleting={true}
        secondsDelay={1}
        doDelete={() => {}}
        id={"id"}
        contentRef={"contentRef"}
        doUndo={() => {}}
      >
        <p>test</p>
      </BareUndoableCellDelete>
    );
    expect(component.find(TimedUndoableDelete)).toHaveLength(1);
  });
});
