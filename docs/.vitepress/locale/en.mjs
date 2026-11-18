export default {
  lang: "en",
  description: "Kernel-based root, everything in the manager.",
  themeConfig: {
    nav: [
      { text: '<i class="ri-home-2-fill"></i> Home', link: "/" },
      { text: '<i class="ri-book-2-fill"></i> Guide', link: "/guide/install" },
      {
        text: '<i class="ri-links-line"></i> Links',
        items: [
          { text: "Releases", link: "https://github.com/KazeSU/KazeSU/releases" },
          { text: "KernelSU Documentation", link: "https://kernelsu.org/" },
          { text: "KernelSU Modules Repository", link: "https://modules.kernelsu.org/" },
          { text: "Translate on Weblate", link: "https://hosted.weblate.org/projects/sukisu-ultra/" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Get started",
        items: [
          {
            text: "Install",
            link: "/guide/install",
            collapsed: false,
            items: [
              { text: "Generic GKI Devices", link: "/guide/install/gki" },
              { text: "Non-GKI Devices", link: "/guide/install/nongki" },
            ],
          },
          { text: "Building Kernel", link: "/guide/build" },
          { text: "FAQ", link: "/guide/faq" },
        ],
      },
      { text: "About KazeSU", link: "/guide/introduce" },
    ],
    editLink: {
      text: "Edit page on GitHub",
      pattern: "https://github.com/KazeSU/KazeSU.github.io/edit/main/docs/:path",
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    lastUpdated: {
      text: "Last updated",
    },
    returnToTopLabel: "Return to top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Appearance",
    langMenuLabel: "Change language",
  },
};
