import { computed, shallowRef, ShallowRef, triggerRef, watchEffect } from 'vue';
import { BASES, BaseSelectorKeys, BASET } from './types';

export class PDocument<T extends BASET, S extends BaseSelectorKeys> {
  private readonly _document: ShallowRef<T>;
  private readonly _selector: Map<S, () => any> = new Map();
  private readonly _plugins: PluginFunction[] = [];

  constructor({
    state,
    selector,
  }: {
    state: T;
    selector?: Record<string, any>;
  }) {
    this._document = shallowRef(state);
    this.reactSelector(selector);
  }

  private reactSelector(selector?: Record<string, any>) {
    if (selector) {
      for (const key in selector) {
        this._selector.set(key as S, () => {
          const data = selector[key](this._document.value);
          triggerRef(this._document);
          return data;
        });
      }
    }
  }

  private get() {
    return this._document;
  }

  private update(v: T | ((state: T) => T)) {
    this._document.value =
      typeof v === 'function' ? v(this._document.value) : v;

    if (!this._document.value) {
      throw new Error('state must be an object , please return state');
    }

    triggerRef(this._document);

    return this._document.value;
  }

  getSelector() {
    return this._selector;
  }

  connect() {
    return {
      get: this.get.bind(this),
      set: this.update.bind(this),
    } as {
      get: () => ShallowRef<T>;
      set: (v: T | ((state: T) => T)) => T;
    };
  }

  selector(selector: S) {
    const selectorFn = this.getSelector()?.get(selector);

    if (!selectorFn) {
      throw new Error('selector not found');
    }

    return shallowRef(selectorFn());
  }

  $subscribe(getter: () => any, callback: () => void) {
    const stop = watchEffect(() => {
      getter();
      callback();
    });
    return stop;
  }

  use(plugin: PluginFunction) {
    this._plugins.push(plugin);
    plugin(this);
  }
}

export function createDocument<
  T extends Record<string, unknown>,
  S extends BaseSelectorKeys
>(options: { state: T; selector?: Record<string, any> }) {
  if (typeof options.state !== 'object') {
    throw new Error('state must be an object');
  }

  return new PDocument<T, S>(options);
}

export function connect<T extends BASET, S extends BASES>(
  store: PDocument<T, S>
) {
  const { get, set } = store.connect();

  return [computed(() => get().value), set] as const;
}

export function selector(store: PDocument<any, any>, selector: any) {
  return computed(() => store.selector(selector).value);
}

export type PluginFunction = (doc: PDocument<any, any>) => void;
