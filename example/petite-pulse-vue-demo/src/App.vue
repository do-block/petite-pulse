<script setup lang="ts">
import { useAtom, useComputed, useValue } from "petite-pulse-vue";

const numAtom = useAtom("testComputed", 1);
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
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAACzCAMAAADtLrzwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURUxpcHNnZ3N3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3cAAAAGRSURBVHja7dSxDsIwDEVfTmU6jBhGBlOgC6WphXXsKjpa2bEhdbTtuTJpSeTxykpgpqsrpS1SUnJUVVWZ3esvLS08Y4J4dDCf7VW0k8zv+C1KjndCprtmnQJlr5NAYNGst1kIjysilxM+M3nJt3y/RL10+P+z99kbqv+Is8c12mXZed+48yzjKkHwVCLOccunbezQJr5PUYGgmewr5PUYlZqw5R1MGdJekz0x0c83Kr5PMt+0oycVuymdJekz1+O9PyxzvzC14+MyJxawz+DLG2HktI+6mto1gJl8sWmkP9Z21fwzxU+pzquTz1ONh41/N6Uz1SfuN7VjRdZo14pZ+sJFGLSqO1Lo7UtUvLzTSR7eUrK9z9X3qUvLV6O1L6UvKR6O3Lf4aaVT//0WrrAAAAAElFTkSuQmCC"
      alt="Petite-pulse"
    />
  </div>
</template>
