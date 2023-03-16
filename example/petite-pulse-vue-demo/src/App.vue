<script setup lang="ts">
import { connect, createAtom, selector as PSelector } from "petite-pulse";

import { useAtom, useComputed, useValue } from "petite-pulse-vue";
import { onUnmounted } from "vue";

const commonStore = createAtom({
  key: "common",
  state: { value: 1 },
  selector: {
    plus: (state: any) => {
      return state.value + 2;
    },
    minus: (state: any) => {
      return state.value - 2;
    },
  },
});

const numAtom = useAtom("testComputed", 1);

const name = useValue(numAtom);

const num = useComputed("num", () => numAtom.value + 1);

const change = () => {
  numAtom.update((value) => value + 1);
};

const [data, setData] = connect(commonStore);
const plusSelector = PSelector(commonStore, "plus");

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
    <p>
      测试文本：
      {{ data.value }}

      选择内容：
      {{ plusSelector }}
    </p>
    <p>
      <button
        @click="
          setData((data) => ({
            value: data.value + 1,
          }))
        "
      >
        +
      </button>
      <button
        @click="
          setData((data) => ({
            value: data.value - 1,
          }))
        "
      >
        -
      </button>
    </p>
  </div>
</template>
