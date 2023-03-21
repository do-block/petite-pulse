import { createAtom } from "petite-pulse";

export const useStore = createAtom({
  key: "common",
  state: { value: 1, age: 3 },
  selector: {
    plus: (state) => {
      return state.value + 2;
    },
    minus: (state) => {
      return state.value - 2;
    },
  },
});
