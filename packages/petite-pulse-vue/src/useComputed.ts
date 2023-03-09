import { Computed, computed, ComputedOptions, react } from "signia";
import { computed as VComputed, isRef, Ref, shallowRef } from "vue";

export function useComputed<Value>(
  name: string,
  compute: () => Value,
  deps?: any[]
): Value;

export function useComputed<Value, Diff = unknown>(
  name: string,
  compute: () => Value,
  opts?: ComputedOptions<Value, Diff>,
  deps?: any[]
): Value;

export function useComputed(...args: any) {
  const name = args[0];
  const compute = args[1];
  const opts = args.length === 3 ? undefined : args[2];
  const deps = args.length === 3 ? args[2] : args[3];

  const $deps = deps?.map((dep: any) => {
    if (isRef(dep)) {
      return dep;
    } else {
      return shallowRef(dep);
    }
  });

  const $val: Computed<unknown> = computed(name, compute, opts);

  const $ref: Ref<unknown> = shallowRef($val.value);

  react(`useComputed(${name})`, () => {
    $ref.value = $val.value;
  });

  const scope = VComputed(() => $ref.value);

  return scope;
}
