import { computed, shallowRef, ShallowRef, triggerRef, watchEffect } from 'vue';
import { UpdateFn } from './../../../../petite-pulse/src/types';
import { BASES, BaseSelectorKeys, BASET, BatchUpdate, MiddlewareFunction, PeddingUpdate } from './types';

export class PDocument<T extends BASET, S extends BaseSelectorKeys> {
  private readonly _document: ShallowRef<T>;
  private readonly _selector: Map<S, () => unknown> = new Map();
  private readonly _plugins: PluginFunction[] = [];
  private _middlewares: MiddlewareFunction[] = [];
  private _subscriptions: Set<() => void> = new Set();

  constructor({
    state,
    selector
  }: {
    state: T;
    selector?: Record<string, any>;
  }) {
    this._document = shallowRef(state);
    this.reactSelector(selector);
  }

  subscribe(callback: () => void) {
    this._subscriptions.add(callback);
  }

  unsubscribe(callback: () => void) {
    this._subscriptions.delete(callback);
  }

  applyMiddlewares(middleware: MiddlewareFunction) {
    this._middlewares.push(middleware);
  }

  public batchUpdate(callback: BatchUpdate<T>) {
    let pendingUpdates: PeddingUpdate<T> = [];

    const setState = (updateFn: UpdateFn<T>) => {
      pendingUpdates.push(updateFn);
    };

    callback(setState);

    let newState = this._document.value;
    pendingUpdates.forEach((updateFn) => {
      newState = updateFn(newState);
    });

    this.update(newState);
  }


  public initialize(initialState: T) {
    if (Object.keys(this._document.value).length === 0) {
      this._document.value = initialState;
    }
  }

  public mergeState(newState: Partial<T>) {
    this._document.value = { ...this._document.value, ...newState };
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
    const newState = typeof v === 'function' ? v(this._document.value) : v;

    this._middlewares.forEach((middleware) =>
      middleware(this._document.value, 'update', newState)
    );

    this._document.value = newState;

    if (!this._document.value) {
      throw new Error('state must be an object , please return state');
    }

    triggerRef(this._document);

    this._subscriptions.forEach((callback) => callback());

    return this._document.value;
  }

  onUpdate(callback: (state: T) => void) {
    this.subscribe(() => {
      callback(this.get().value);
    });
  }

  getSelector() {
    return this._selector;
  }

  connect(): {
    get: () => ShallowRef<T>;
    set: (v: T | ((state: T) => T)) => T;
  } {
    return {
      get: this.get.bind(this),
      set: this.update.bind(this)
    }
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
>(options: { state: T; selector?: Record<string, unknown> }) {
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
