import { PDocument } from './store';

export type BaseSelectorKeys = string | number | symbol;

export type BASET = Record<string, unknown>;
export type BASES = BaseSelectorKeys;

export type BaseStore<T extends BASET, S extends BASES> = {
  keys: Set<string>;
  treeStore: Record<string, PDocument<T, S>>;
};
export interface Selector<T> {
  [key: string]: (state: T) => any;
}

export type AtomOptions<T, S extends Selector<T>> = {
  key: string;
  state: T;
  selector?: S;
};
