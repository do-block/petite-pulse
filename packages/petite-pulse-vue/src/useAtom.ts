import { Atom, AtomOptions, atom } from "signia";

export function useAtom<Value, Diff = unknown>(
  name: string,
  valueOrInitialiser: Value | (() => Value),
  options?: AtomOptions<Value, Diff>
): Atom<Value, Diff> {
  const initialValue =
    typeof valueOrInitialiser === "function"
      ? (valueOrInitialiser as any)()
      : valueOrInitialiser;

  return atom(`useAtom(${name})`, initialValue, options);
}
