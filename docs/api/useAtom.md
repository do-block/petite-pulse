---
outline: deep
---

# useAtom
生成一个原子，原子是一个可被订阅的状态，可以通过 `useValue` 获取原子的值。 
在对原子进行更新时，会触发所有订阅了该原子的组件重新渲染。

```vue

<script setup lang="ts">
import { useAtom, useValue } from "petite-pulse-vue";

const numAtom = useAtom("num", 0);
const num = useValue(numAtom);

const change = () => {
  numAtom.update((value) => value + 1);
};
</script>;

<template>
  <p>
    <button @click="change">{{ num }}</button>
  </p>
</template>;
```
