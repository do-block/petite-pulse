import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const DESCRIPTION =
  "A delicious and fresh store for your Vue applications";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: DESCRIPTION,
  head: [['meta', { property: 'og:description', content: DESCRIPTION }]],

  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/documentation',
      },
      { text: 'API', link: '/api/useAtom' },
    ],

    sidebar: {
      documentation: [
        {
          text: 'Guide',
          items: [
            { text: 'Core Concepts', link: '/documentation/core-concepts' },
            { text: 'Plugins', link: '/documentation/plugins' },
            {
              text: 'Plugin Development',
              link: '/documentation/plugin-development',
            },
          ],
        },
      ],
      api: [
        {
          text: 'Vue Hook',
          items: [
            { text: 'useAtom', link: '/api/useAtom' },
            { text: 'useValue', link: '/api/useValue' },
            { text: 'useComputed', link: '/api/useComputed' },
          ],
        },
      ],
    },
  },
};
