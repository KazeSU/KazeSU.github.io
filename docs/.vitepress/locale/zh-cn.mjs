export default {
  lang: "zh-CN",
  description: "基于内核的 ROOT，管理器里什么都有。",
  themeConfig: {
    nav: [
      { text: '<i class="ri-home-2-fill"></i> 首页', link: "/zh-Hans/" },
      { text: '<i class="ri-book-2-fill"></i> 指南', link: "/zh-Hans/guide/install" },
      {
        text: '<i class="ri-links-line"></i> 链接',
        items: [
          { text: "下载", link: "https://github.com/KazeSU/KazeSU/releases" },
          { text: "KernelSU 文档", link: "https://kernelsu.org/" },
          { text: "KernelSU 模块仓库", link: "https://modules.kernelsu.org/" },
          { text: "在 Weblate 上翻译", link: "https://hosted.weblate.org/projects/sukisu-ultra/" },
        ],
      },
    ],
    sidebar: [
      {
        text: "开始使用",
        items: [
          {
            text: "安装",
            link: "/zh-Hans/guide/install",
            collapsed: false,
            items: [
              { text: "通用 GKI 设备", link: "/zh-Hans/guide/install/gki" },
              { text: "Non-GKI 设备", link: "/zh-Hans/guide/install/nongki" },
            ],
          },
          { text: "编译内核", link: "/zh-Hans/guide/build" },
          { text: "非官方支持设备", link: "/zh-Hans/guide/unofficial-devices" },
          { text: "常见问题", link: "/zh-Hans/guide/faq" },
        ],
      },
      { text: "关于 KazeSU", link: "/zh-Hans/guide/introduce" },
    ],
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/KazeSU/KazeSU.github.io/edit/main/docs/:path",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "外观",
    langMenuLabel: "切换语言",
  },
};
