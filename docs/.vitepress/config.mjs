import { defineConfig } from "vitepress";

import llmstxt from "vitepress-plugin-llms";
import { copyOrDownloadAsMarkdownButtons } from "vitepress-plugin-llms";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import mdAutoSpacing from "markdown-it-autospace";
import locale from "./locale/index.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KazeSU",
  description: "A kernel-based root solution for Android, with the whole toolkit in the manager.",

  sitemap: {
    hostname: "https://kazesu.github.io",
  },

  locales: locale.locales,

  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["link", { rel: "canonical", href: "https://kazesu.github.io/" }],
    ["link", { rel: "alternate", hreflang: "en", href: "https://kazesu.github.io/" }],
    ["link", { rel: "alternate", hreflang: "zh-CN", href: "https://kazesu.github.io/zh-Hans/" }],
    ["link", { rel: "alternate", hreflang: "x-default", href: "https://kazesu.github.io/" }],
    ["link", { rel: "preconnect", href: "https://cdn.jsdelivr.net/" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/jetbrains-mono-webfont@latest/jetbrains-mono.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/misans-vf-4web@latest/dist/result.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/remixicon@latest/fonts/remixicon.css",
      },
    ],

    ["meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }],
    [
      "meta",
      {
        name: "description",
        content: "A kernel-based root solution for Android. App Profile, KPM, built-in Zygisk, SUSFS tooling and themes — all in one manager.",
      },
    ],
    ["meta", { name: "theme-color", content: "#142A37", media: "(prefers-color-scheme: light)" }],
    ["meta", { name: "theme-color", content: "#142A37", media: "(prefers-color-scheme: dark)" }],
    ["meta", { name: "color-scheme", content: "light dark" }],

    [
      "meta",
      {
        name: "keywords",
        content: "KazeSU, KernelSU, SukiSU, Android, ROOT, Custom Kernel, GKI, Non-GKI, KPM, SUSFS, Zygisk, Android Root, KernelSU Modules",
      },
    ],
    ["meta", { name: "author", content: "KazeSU Development" }],
    ["meta", { name: "application-name", content: "KazeSU" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "KazeSU" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "default" }],

    ["meta", { property: "og:title", content: "KazeSU — Kernel-based root, everything in the manager" }],
    [
      "meta",
      {
        property: "og:description",
        content: "A kernel-based root solution for Android. App Profile, KPM, built-in Zygisk, SUSFS tooling and themes — all in one manager.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "KazeSU" }],
    ["meta", { property: "og:url", content: "https://kazesu.github.io/" }],
    ["meta", { property: "og:image", content: "https://kazesu.github.io/logo.svg" }],
    ["meta", { property: "og:image:alt", content: "KazeSU Logo" }],
    ["meta", { property: "og:image:width", content: "1024" }],
    ["meta", { property: "og:image:height", content: "1024" }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:locale:alternate", content: "zh_CN" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "KazeSU — Kernel-based root, everything in the manager" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "A kernel-based root solution for Android. App Profile, KPM, built-in Zygisk, SUSFS tooling and themes — all in one manager.",
      },
    ],
    ["meta", { name: "twitter:image", content: "https://kazesu.github.io/logo.svg" }],
    ["meta", { name: "twitter:image:alt", content: "KazeSU Logo" }],
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: "KazeSU",
            url: "https://kazesu.github.io/",
            logo: "https://kazesu.github.io/logo.svg",
            sameAs: ["https://github.com/KazeSU", "https://t.me/Sukiksu"],
          },
          {
            "@type": "WebSite",
            name: "KazeSU",
            url: "https://kazesu.github.io/",
            inLanguage: ["en", "zh-CN"],
          },
        ],
      }),
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.svg",
    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            tokenize: (text) => Array.from(
              new Intl.Segmenter("zh-CN", { granularity: "word" }).segment(text),
            ).filter((part) => part.isWordLike).map((part) => part.segment),
          },
        },
        locales: {
          "zh-Hans": {
            translations: {
              button: { buttonText: "搜索", buttonAriaLabel: "搜索文档" },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "清除搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有找到结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "回车键",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/KazeSU" },
      { icon: "telegram", link: "https://t.me/Sukiksu" },
    ],
    footer: {
      message: "Documented with ❤️ by KazeSU Development",
      copyright: "Copyright © 2026 KazeSU, under MIT License",
    },

    outline: {
      level: [2, 4],
    },
    externalLinkIcon: true,
  },

  markdown: {
    config: (md) => {
      md.use(BiDirectionalLinks());
      md.use(copyOrDownloadAsMarkdownButtons);
      md.use(InlineLinkPreviewElementTransform);
      md.use(mdAutoSpacing, {
        pangu: true,
        mojikumi: true,
        spacingItems: ["code_inline"],
      });
    },
  },

  vite: {
    plugins: [
      llmstxt(),
      GitChangelog({
        repoURL: () => "https://github.com/KazeSU/KazeSU.github.io",
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith("index.md"),
        sections: {
          disableContributors: true,
        },
      }),
    ],
    worker: {
      format: "es",
    },
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "@nolebase/vitepress-plugin-inline-link-preview/client",
        "vitepress",
        "@nolebase/ui",
      ],
    },
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
        "@nolebase/vitepress-plugin-inline-link-preview",
        "@nolebase/ui",
      ],
    },
  },
});
