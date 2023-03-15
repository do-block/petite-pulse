<script setup lang="ts">
import { useAtom, useComputed, useValue } from "petite-pulse-vue";
import { onUnmounted } from "vue";

const numAtom = useAtom("testComputed", 1);
const name = useValue(numAtom);
const num = useComputed("num", () => numAtom.value + 1);

const change = () => {
  numAtom.update((value) => value + 1);
};
onUnmounted(() => {
  console.log("mounted");
});
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
