# Petite-Pulse localStorage Plugin

`localStoragePlugin`是一个为`Petite-Pulse`设计的插件，它可以使用浏览器的localStorage来保存和加载你的应用程序状态。该插件确保你的状态在浏览器会话之间是持久的。

## 安装

要使用localStoragePlugin，需要先安装Petite-Pulse:

```bash

npm install petite-pulse
```

## 使用方法

以下是如何在Petite-Pulse中使用localStoragePlugin的步骤：

导入所需的函数和插件：

```javascript

import { connect, createDocument } from 'petite-pulse';
import { localStoragePlugin } from './localStoragePlugin';
```

### 创建一个新的store并设置初始状态

```javascript

const store = createDocument({
  state: {
    name: 'John',
  },
});
```

### 将localStoragePlugin应用于store

```javascript

store.use(
  localStoragePlugin({
    key: 'test-app-state',
  })
);
```

### 连接store并在应用程序中使用它

```javascript

const [state, setState] = connect(store);

console.log(state.value.name); // 输出：'John'
```

### 更新状态

```javascript

setState((state) => {
  return {
    ...state,
    name: 'Jane',
  };
});
console.log(state.value.name); // 输出：'Jane'
```

### 插件将自动将更新的状态保存到localStorage中

``` javascript

console.log(JSON.parse(localStorage.getItem('test-app-state') || '')); // 输出：{ name: 'Jane' }
```

#### 当你创建一个新的store并应用插件时，它将从localStorage中加载状态

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
console.log(newState.value.name); // 输出：'Jane'
```

### 插件选项

`localStoragePlugin`接受一个带有以下属性的选项对象：
    1.  `key`（必需）：用于从localStorage中存储和检索状态的键。

例如：

```javascript

store.use(
  localStoragePlugin({
    key: 'test-app-state',
  })
);
```

## 测试

要测试`localStoragePlugin`，可以使用像`vitest`这样的测试库：

```javascript

import { describe, expect, it } from 'vitest';

describe('localStoragePlugin', () => {
  // 在这里编写你的测试
});
```

有关完整示例，请参阅提供的原始问题中提供的测试代码。
