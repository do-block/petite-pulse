import {
    connect,
    createDocument, PluginFunction
} from 'petite-pulse';
import { describe, expect, it } from 'vitest';

export function localStoragePlugin({
  key,
}: {
  key: string;
  override?: boolean;
}): PluginFunction {
  return (doc) => {
    // Load state from localStorage
    const storedState = localStorage.getItem(key);
    if (storedState) {
      try {
        doc.mergeState(JSON.parse(storedState));
      } catch (error) {
        console.error('Failed to load state from localStorage:', error);
      }
    }

    // Save state to localStorage on updates
    doc.onUpdate((state) => {
      localStorage.setItem(key, JSON.stringify(state));
    });
  };
}

describe('localStoragePlugin', () => {
  it('Save and load state from localStorage', async () => {
    const store = createDocument({
      state: {
        name: 'John',
      },
    });

    store.use(
      localStoragePlugin({
        key: 'test-app-state',
      })
    );

    const [state, setState] = connect(store);

    expect(state.value.name).toEqual('John');

    setState((state) => {
      return {
        ...state,
        name: 'Jane',
      };
    });

    expect(state.value.name).toEqual('Jane');
    expect(JSON.parse(localStorage.getItem('test-app-state') || '')).toEqual({
      name: 'Jane',
    });

    // Create a new store and load state from localStorage
    const newStore = createDocument({
      state: {
        name: '',
      },
    });

    newStore.use(
      localStoragePlugin({
        key: 'test-app-state',
      })
    );

    const [newState] = connect(newStore);
    expect(newState.value.name).toEqual('Jane');
  });
});
