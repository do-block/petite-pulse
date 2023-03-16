import { createPulse } from "petite-pulse";
import { createApp } from "vue";

import App from "./App.vue";
import "./style.css";
const petitePulse = createPulse();

createApp(App).use(petitePulse).mount("#app");

// const data = createDocument
