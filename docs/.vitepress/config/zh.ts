import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const DESCRIPTION = "一个为你的 Vue 应用提供美味和新鲜的 store";

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: DESCRIPTION,
  head: [["meta", { property: "og:description", content: DESCRIPTION }]],

  themeConfig: {
    outline: {
      label: "本页内容",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    nav: [
      {
        text: "文档",
        link: "/zh/documentation",
        activeMatch: "/zh/documentation/core-concepts",
      },
      { text: "API", link: "/zh/api/useAtom" },
    ],
    sidebar: {
      "zh/documentation": [
        {
          text: "指南",
          collapsed: false,
          items: [
            { text: "核心概念", link: "/zh/documentation/core-concepts/" },
            { text: "插件", link: "/zh/documentation/plugins/" },
            { text: "插件开发", link: "/zh/documentation/plugin-development/" },
          ],
        },
      ],
      "zh/api": [
        {
          text: "Vue Hook",
          collapsed: false,
          items: [
            { text: "useAtom", link: "/zh/api/useAtom" },
            { text: "useValue", link: "/zh/api/useValue" },
            { text: "useComputed", link: "/zh/api/useComputed" },
          ],
        },
      ],
    },
  },
};
