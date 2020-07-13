import {
  char_idx_to_js_idx,
  js_idx_to_char_idx
} from "../../src/jupyter/surrogate";

describe("js_idx_to_char_idx", () => {
  it("doesn't apply offset to characters outside of range", () => {
    const result = js_idx_to_char_idx(0, "this is a string");
    expect(result).toBe(0);
  });
  it("applies offset to characters outside of range", () => {
    const result = js_idx_to_char_idx(2, "😃😃😃😃");
    expect(result).toBe(1);
  });
});

describe("char_idx_to_js_idx", () => {
  it("doesn't apply offset to characters outside of range", () => {
    const result = char_idx_to_js_idx(0, "this is a string");
    expect(result).toBe(0);
  });
  it("applies offset to characters outside of range", () => {
    const result = char_idx_to_js_idx(1, "😃😃😃😃");
    expect(result).toBe(2);
  });
});
