/**
 * Vue plugin for Petite Pulse
 */
import { Plugin } from 'vue';
import { STORE_SYMBOL } from './symbols';
import { BaseStore } from './types';

export const plugin: () => Plugin = () => {
  const defaultStore: BaseStore<
    Record<string, unknown>,
    string | number | symbol
    > = {
    keys: new Set(),
    treeStore:  {},
  };

  return {
    install(app) {
      app.provide(STORE_SYMBOL, defaultStore);
    },
  };
};
