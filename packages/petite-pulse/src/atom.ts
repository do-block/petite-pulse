import { inject } from 'vue';
import { createDocument } from './store';
import { STORE_SYMBOL } from './symbols/plugins';
import { Atom, BaseSelectorKeys, BaseStore } from './types';

export const createAtom = function ({
  key,
  selector,
  state,
}: Atom<BaseSelectorKeys>) {
  const $store = inject(STORE_SYMBOL) as BaseStore | undefined;

  if (!$store) {
    throw new Error(
      'petite-pulse: store is not provided, consider using createPulse plugin'
    );
  }

  if (typeof key !== 'string' || key.trim() === '') {
    throw new Error("petite-pulse: atom's key is not provided or invalid");
  }

  if ($store.keys.has(key)) {
    return $store.treeStore.get(key);
  }

  $store.keys.add(key);

  const store = createDocument({
    state,
    selector,
  });

  $store.treeStore.set(key, store);

  return store;
};
