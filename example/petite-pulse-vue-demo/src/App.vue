<script setup lang="ts">
import { atom } from "signia";
import { useComputed, useValue } from "petite-pulse-vue";

const numAtom = atom("testComputed", 1);

const name = useValue(numAtom);
const num = useComputed("num", () => numAtom.value + 1);

const change = () => {
  numAtom.update((value) => value + 1);
};
</script>

<template>
  <div>
    <p>
      useValue:
      <button @click="change">{{ name }}</button>
    </p>
    <p>
      useComputed:
      {{ num }}
    </p>
  </div>
</template>
