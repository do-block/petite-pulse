import { Plugin, ShallowRef, shallowRef, triggerRef } from "vue";
import { BaseSelectorKeys, SelectorRecord } from "./types";

const createAtom = function () {
  const plugin: Plugin = {
    install(app) {
      app.config.globalProperties.$petitePulse = function () {
        console.log("petite pulse");
      };
    },
  };
  return plugin;
};

class Document<T extends Record<string, unknown>, S extends BaseSelectorKeys> {
  private readonly _document: ShallowRef<T>;
  private readonly _selector: Record<S, () => ShallowRef<T>> = {} as Record<
    S,
    () => ShallowRef<T>
  >;

  constructor({ state, selector }: { state: T; selector?: SelectorRecord<S> }) {
    this._document = shallowRef(state);
    this.reactSelector<S>(selector);
  }

  private reactSelector<S extends BaseSelectorKeys>(
    selector?: SelectorRecord<S>
  ) {
    if (selector) {
      Object.keys(selector).forEach((key) => {
        this._selector[key] = () => {
          selector[key](this._document.value, () => {
            triggerRef(this._document);
          });
          return this._document.value;
        };
      });
    }
  }

  private get() {
    return this._document.value;
  }

  getSelector() {
    return this._selector;
  }

  private update(v: unknown) {
    this._document.value =
      typeof v === "function" ? v(this._document.value) : v;
    triggerRef(this._document);

    return this._document.value;
  }

  connect() {
    return [this.get(), this.update.bind(this)];
  }
}

export function createDocument<
  T extends Record<string, unknown>,
  S extends BaseSelectorKeys
>(options: { state: T; selector?: SelectorRecord<S> }) {
  if (typeof options.state !== "object") {
    throw new Error("state must be an object");
  }

  const store = new Document<T, S>(options);
  return store;
}

export function useSelector<
  T extends Record<string, unknown>,
  S extends BaseSelectorKeys
>(store: Document<T, S>, selector: S) {
  const selectorFn = store.getSelector()?.[selector];
  if (!selectorFn) {
    throw new Error("selector not found");
  }

  return selectorFn();
}

export default createAtom;
