import { createDocument, Selector, SelectorRecord } from "petite-pulse";
import { describe, expect, it } from "vitest";

describe("changeData", () => {
  it("Create store", async () => {
    const store = createDocument({
      state: {
        name: "John",
      },
    });

    const [state, setState] = store.connect();

    expect(state).toEqual({ name: "John" });

    setState((value) => {
      value.name = "Jane";
    });

    expect(state.name).toEqual("Jane");
  });
});

describe("selector", () => {
  it("Create store", async () => {
    const setName: Selector = (state, next) => {
      state.name = "Jane";
      next();
    };

    const setTwoName: Selector = (state, next) => {
      state.name = "One";
      next();
    };

    const selector = {
      setName,
      setTwoName,
    };
    const storeState = {
      name: "John",
    };

    const selectorValues: SelectorRecord<keyof typeof selector> = {
      setName,
      setTwoName,
    };

    const store = createDocument({
      state: storeState,
      selector: selectorValues,
    });

    const [state] = store.connect();

    expect(state).toEqual({ name: "John" });

    const result = store.useSelector("setName");

    expect(result).toEqual({
      name: "Jane",
    });

    const twoName = store.useSelector("setTwoName");
    expect(twoName).toEqual({
      name: "One",
    });
  });
});
