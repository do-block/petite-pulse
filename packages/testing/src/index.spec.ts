import {
  createDocument,
  Selector,
  SelectorRecord,
  useSelector,
} from "petite-pulse";
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

describe("middleware", () => {
  it("Create store", async () => {
    const setName: Selector = (state, next) => {
      state.name = "Jane";
      next();
    };

    const selector = {
      setName,
    };
    const storeState = {
      name: "John",
    };

    const selectorValues: SelectorRecord<keyof typeof selector> = {
      setName,
    };

    const store = createDocument({
      state: storeState,
      selector: selectorValues,
    });

    const [state] = store.connect();

    expect(state).toEqual({ name: "John" });

    const result = useSelector<typeof storeState, keyof typeof selector>(
      store,
      "setName"
    );

    console.log("result", result);

    expect(result).toEqual({ name: "Jane" });
  });
});
