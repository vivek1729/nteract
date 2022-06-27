export interface MultiSelectAction {
  id: string;
  contentRef: string;
}

export interface MultiselectCells {
  selectCell(payload: MultiSelectAction): void;
  unselectCell(payload: MultiSelectAction): void;
  clearSelectedCells(): void;
}
