import { Plugin } from 'vue';
import { STORE_SYMBOL } from './symbols';
import { BaseStore } from './types';

export const plugin: () => Plugin = () => {
  const defaultStore: BaseStore = {
    keys: new Set(),
    treeStore: new Map(),
  };

  return {
    install(app) {
      app.provide(STORE_SYMBOL, defaultStore);
    },
  };
};
