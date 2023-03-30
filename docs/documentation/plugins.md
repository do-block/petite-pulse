# Petite-Pulse localStorage Plugin

The `localStoragePlugin` is a plugin for Petite-Pulse that helps you to save and load your application state using the browser's localStorage. This plugin ensures that your state is persistent across browser sessions.

## Installation

To use the localStoragePlugin, you need to have Petite-Pulse installed in your project:

bash

```bash
npm install petite-pulse
```

## Usage

Here's a step-by-step guide on how to use the localStoragePlugin with Petite-Pulse:

### Import the required functions and the plugin

```javascript

import { connect, createDocument } from 'petite-pulse';
import { localStoragePlugin } from './localStoragePlugin';
```

### Create a new store with an initial state

```javascript

const store = createDocument({
  state: {
    name: 'John',
  },
});
```

### Apply the localStoragePlugin to your store

```javascript

store.use(
  localStoragePlugin({
    key: 'test-app-state',
  })
);
```

### Connect to the store and use it in your application

```javascript

const [state, setState] = connect(store);

console.log(state.value.name); // Output: 'John'
```

### Update the state

```javascript

setState((state) => {
  return {
    ...state,
    name: 'Jane',
  };
});

console.log(state.value.name); // Output: 'Jane'
```

### The plugin will automatically save the updated state to localStorage

```javascript

console.log(JSON.parse(localStorage.getItem('test-app-state') || '')); // Output: { name: 'Jane' }
```

### When you create a new store and apply the plugin, it will load the state from localStorage

```javascript

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
console.log(newState.value.name); // Output: 'Jane'
```

## Plugin Options

The `localStoragePlugin` accepts an options object with the following properties:

   1. key (required): The key to use when storing and retrieving state from localStorage.

Example:

```javascript

store.use(
  localStoragePlugin({
    key: 'test-app-state',
  })
);
```

### Testing

To test the localStoragePlugin, you can use a testing library like vitest:

```javascript

import { describe, expect, it } from 'vitest';

describe('localStoragePlugin', () => {
  // Your tests here
});
```

Refer to the provided test code in the original question for a complete example.
