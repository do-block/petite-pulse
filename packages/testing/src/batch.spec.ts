import { connect, createDocument } from 'petite-pulse';
import { describe, expect, it } from 'vitest';

describe('batchUpdate', () => {
    it('Updates state in batch', async () => {
        const store = createDocument({
            state: {
                counter: 0,
            },
        });

        const [state, setState] = connect(store);

        // Initial state
        expect(state.value).toEqual({ counter: 0 });

        const start = performance.now();

        // Perform multiple updates in a single batchUpdate
        store.batchUpdate((setState) => {
            setState((state) => ({ ...state, counter: state.counter + 1 }));
            setState((state) => ({ ...state, counter: state.counter + 1 }));
            setState((state) => ({ ...state, counter: state.counter + 1 }));
        });

        const end = performance.now();

        console.log('Batch state updates: ' + (end - start) + ' ms');

        // Check if state has been updated correctly
        expect(state.value.counter).toEqual(3);

        // Check if state has been updated correctly
        setState((state) => ({ ...state, counter: state.counter + 1 }));
        expect(state.value.counter).toEqual(4);
    });
});
