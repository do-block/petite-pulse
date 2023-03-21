import { inject } from 'vue';
import { createDocument } from './store';
import { STORE_SYMBOL } from './symbols/plugins';
import { AtomOptions, BASES, BaseStore, BASET, Selector } from './types';

export const createAtom = function <T extends BASET, S extends Selector<T>>({
  key,
  selector,
  state,
}: AtomOptions<T, S>) {
  return () => {
    const $store = inject(STORE_SYMBOL) as BaseStore<T, BASES> | undefined;

    if (!$store) {
      throw new Error(
        'petite-pulse: store is not provided, consider using createPulse plugin'
      );
    }

    if (typeof key !== 'string' || key.trim() === '') {
      throw new Error("petite-pulse: atom's key is not provided or invalid");
    }

    if ($store.keys.has(key)) {
      return $store.treeStore[key];
    }

    $store.keys.add(key);

    const store = createDocument<T, BASES>({
      state,
      selector,
    });

    $store.treeStore[key] = store;

    return store;
  };
};
