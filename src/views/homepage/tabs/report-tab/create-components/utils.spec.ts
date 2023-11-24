import { mergeObjects } from "./utils";

describe("Homepage utils", () => {
  it("should merge all objects", () => {
    expect(mergeObjects({ baseObj: { a: 1 }, newObj: { b: 2 } })).toEqual({
      a: 1,
      b: 2,
    });
    expect(
      mergeObjects({
        baseObj: { a: 1, b: 3 },
        newObj: { b: 2 },
        initial: { b: null },
      })
    ).toEqual({
      a: 1,
      b: 2,
    });
  });
});
