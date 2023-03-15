export type Selector = (state: any, next: () => void) => void;

export type BaseSelectorKeys = string | number | symbol;

export type SelectorRecord<S extends BaseSelectorKeys> = Record<S, Selector>;
