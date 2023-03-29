<script setup lang="ts">
import { connect, selector as PSelector } from "petite-pulse";

import { useStore } from "./store";

import { useAtom, useComputed, useValue } from "petite-pulse-vue";

const numAtom = useAtom("testComputed", 1);

const name = useValue(numAtom);

const num = useComputed("num", () => numAtom.value + 1);

const changeName = () => {
  numAtom.update((value: any) => value + 1);
};

const store = useStore();

const [data, setData] = connect(store);

const plusSelector = PSelector(store, "plus");
</script>

<template>
  <div>
    <p>
      useValue:
      <button @click="changeName">{{ name }}</button>
    </p>
    <p>
      useComputed:
      {{ num }}
    </p>
    <p>
      test text：
      {{ data }}
      selector ：
      {{ plusSelector }}
    </p>
    <p>
      <button
        @click="setData((state) => ({ ...state, value: state.value + 1 }))"
      >
        +
      </button>
      <button
        @click="setData((state) => ({ ...state, value: state.value - 1 }))"
      >
        -
      </button>
    </p>
  </div>
</template>
