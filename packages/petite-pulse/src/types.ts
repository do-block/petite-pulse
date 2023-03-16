export type Selector = (state: any) => any;

export type BaseSelectorKeys = string | number | symbol;

export type SelectorRecord<S> = Map<S, Selector>;

export type BaseStore = {
  keys: Set<string>;
  treeStore: Map<string, any>;
};

export type Atom<S> = {
  key: string;
  state: any;
  selector?: Record<string, any>;
};
