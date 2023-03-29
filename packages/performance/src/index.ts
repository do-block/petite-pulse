import { connect, createDocument } from 'petite-pulse';

const store = createDocument({
  state: {
    counter: 0,
    info: {
      name: 'petite-pulse',
      version: 1,
    }
  },
});

const [state, setState] = connect(store);

const startNumber = performance.now(); 
// mock 1000 number state updates
for (let i = 0; i < 100000; i++) {
  setState((state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  });
}

const endNumber = performance.now(); 
console.log('Number state updates: ' + (endNumber - startNumber) + ' ms'); 

const startObject = performance.now();
// Mock 1000 obj state updates
for (let i = 0; i < 100000; i++) {
  setState((state) => {
    return {
      ...state,
      info: {
        ...state.info,
        name: 'petite-pulse' + i,
        version: i,
      },
    };
  });
}

const endObject = performance.now(); 
console.log('Object state updates: ' + (endObject - startObject) + ' ms');


