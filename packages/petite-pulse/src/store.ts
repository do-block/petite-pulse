import { computed, shallowRef, ShallowRef, triggerRef } from 'vue';
import { BaseSelectorKeys } from './types';

class Document<T extends Record<string, any>, S extends BaseSelectorKeys> {
  private readonly _document: ShallowRef<T>;
  private readonly _selector: Map<S, () => any> = new Map();

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

  getSelector() {
    return this._selector;
  }

  private update(v: unknown) {
    console.log('update', v);
    this._document.value =
      typeof v === 'function' ? v(this._document.value) : v;

    triggerRef(this._document);

    return this._document.value;
  }

  connect() {
    return {
      get: this.get.bind(this),
      set: this.update.bind(this),
    };
  }

  selector(selector: S) {
    const selectorFn = this.getSelector()?.get(selector);

    if (!selectorFn) {
      throw new Error('selector not found');
    }

    return shallowRef(selectorFn());
  }
}

export function createDocument<
  T extends Record<string, unknown>,
  S extends BaseSelectorKeys
>(options: { state: T; selector?: Record<string, any> }) {
  if (typeof options.state !== 'object') {
    throw new Error('state must be an object');
  }

  const store = new Document<T, S>(options);
  return store;
}

export function connect(store: Document<any, any>) {
  const { get, set } = store.connect();

  return [computed(() => get()), set];
}

export function selector(store: Document<any, any>, selector: any) {
  return computed(() => store.selector(selector).value);
}
