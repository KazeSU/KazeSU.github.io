---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "KazeSU"
  text: "基于内核的 ROOT，一个管理器就够了"
  tagline: "App Profile、KPM、内置 Zygisk、SUSFS 工具与主题商店——不必再装一堆配套应用。"
  image:
    src: /logo.svg
    alt: KazeSU Logo
  actions:
    - theme: brand
      text: 快速上手
      link: /zh-Hans/guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/KazeSU/KazeSU
    - theme: alt
      text: 关于项目
      link: /zh-Hans/guide/introduce

features:
  - title: 内核级 su
    details: 由内核授予 ROOT，支持按应用配置权限，临时授权到期自动失效。
    icon: <i class="ri-android-fill"></i>
  - title: 工具箱都在一个应用里
    details: App Profile、KPM、内置 Zygisk、主题商店与内核扩展中心，全都集成在管理器里。
    icon: <i class="ri-smartphone-fill"></i>
  - title: 内置 Zygisk
    details: NyaZygisk 直接内置在管理器中，无需另装 Zygisk 模块，运行状态显示在首页。
    icon: <i class="ri-flashlight-fill"></i>
  - title: 支持 KPM
    details: 开启 CONFIG_KPM=y 即可加载 KernelPatch 模块，底层基于 KernelPatch。
    icon: <i class="ri-plug-fill"></i>
    link: ./guide/build.md
  - title: 隐藏能力内置
    details: 内置 SUSFS 管理，一键配置 ROOT 隐藏；扩展中心还提供挂载视图隐藏。
    icon: <i class="ri-eye-off-fill"></i>
  - title: 双 UI 与主题
    details: Miuix 或 Material 3 Expressive，支持 Miuix 启动图，主题商店带镜像与审核。
    icon: <i class="ri-palette-fill"></i>
---
