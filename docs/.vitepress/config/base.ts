import { defineConfig } from "vitepress";

export const baseConfig = defineConfig({
  title: "Petite-pulse",
  description: "脉动",

  head: [["meta", { name: "theme-color", content: "#3c8772" }]],

  markdown: {
    theme: {
      dark: "dracula-soft",
      light: "vitesse-light",
    },

    attrs: {
      leftDelimiter: "%{",
      rightDelimiter: "}%",
    },
  },

  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/wluobing/petite-pulse",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
    },
  },
});
