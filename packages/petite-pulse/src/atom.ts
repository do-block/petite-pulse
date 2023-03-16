import { inject } from 'vue';
import { STORE_SYMBOL } from './symbols/plugins';
import { Atom, BaseStore } from './types';

export const createAtom = function ({ key }: Atom) {
  const $store = inject(STORE_SYMBOL) as BaseStore | undefined;
  if (!$store) {
    throw new Error(
      'petite-pulse: store is not provided, consider using createPulse plugin'
    );
  }

  if (!key || $store.keys.has(key)) {
    console.error("petite-pulse: atom's key is not provided or duplicated");
    return;
  }

  $store.keys.add(key);

  $store.treeStore[key] = {
    value: undefined,
    subscribers: new Set(),
  };
};
