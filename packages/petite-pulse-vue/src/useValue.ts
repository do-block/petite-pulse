import { Computed, computed, react, Signal } from "signia";
import { computed as VComputed, Ref, shallowRef } from "vue";

export function useValue<Value>(value: Signal<Value>): Value;
export function useValue<Value>(
  name: string,
  fn: () => Value,
  deps: unknown[]
): Value;

export function useValue(...args: any) {
  const name = args.length === 3 ? args[0] : `useValue(${args[0].name})`;

  const $val: Computed<unknown> | Signal<any> =
    args.length === 1 ? args[0] : computed(name, args[1]);

  const $ref: Ref<unknown> = shallowRef($val.value);

  const scope = VComputed(() => $ref.value);

  react(`useValue(${name})`, () => {
    $ref.value = $val.value;
  });

  return scope;
}
