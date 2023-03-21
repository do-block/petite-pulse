import { defineConfig } from "vitepress";
import { zhConfig } from "./zh";
import { baseConfig } from "./base";
import { enConfig } from "./en";

export default defineConfig({
  ...baseConfig,
  locales: {
    root: { label: "English", lang: "en-US", link: "/", ...enConfig },
    zh: { label: "简体中文", lang: "zh-CN", link: "/zh/", ...zhConfig },
  },
});
