import { connect, createDocument } from 'petite-pulse';
import { describe, expect, it } from 'vitest';

describe('changeData', () => {
  it('Create store', async () => {
    const store = createDocument({
      state: {
        name: 'John',
      },
    });

    const [state, setState] = connect(store);

    expect(state.value).toEqual({ name: 'John' });

    setState((state) => {
      return {
        ...state,
        name: 'Jane',
      };
    });

    expect(state.value.name).toEqual('Jane');
  });
});

describe('selector', () => {
  it('Create store', async () => {
    const storeState = {
      name: 'John',
    };

    const store = createDocument({
      state: storeState,
    });

    const [state] = connect(store);

    expect(state.value.name).toEqual('John');
  });
});

describe('use', () => {
  it('Use store', async () => {
    const storeState = {
      name: 'John',
    };

    const store = createDocument({
      state: storeState,
    });

    const [state, setData] = connect(store);

    expect(state.value.name).toEqual('John');

    store.use((store) => {
      store.$subscribe(
        () => store.connect().get().value.name,
        () => {
          console.log('store changed:', store.connect().get().value.name);
        }
      );
    });

    setData((state) => {
      return {
        ...state,
        name: 'Jane',
      };
    });

    expect(state.value.name).toEqual('Jane');
  });
});
