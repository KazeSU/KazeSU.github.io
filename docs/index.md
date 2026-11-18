---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "KazeSU"
  text: "Kernel-based root, one manager"
  tagline: "App Profile, KPM, built-in Zygisk, SUSFS tooling and themes — without a pile of companion apps."
  image:
    src: /logo.svg
    alt: KazeSU Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/KazeSU/KazeSU
    - theme: alt
      text: About
      link: /guide/introduce

features:
  - title: Kernel-level su
    details: Root is granted by the kernel, with per-app profiles and temporary grants that expire on their own.
    icon: <i class="ri-android-fill"></i>
  - title: The whole toolkit, one app
    details: App Profile, KPM, built-in Zygisk, the Theme Store and the Kernel Extension Center live in the manager.
    icon: <i class="ri-smartphone-fill"></i>
  - title: Built-in Zygisk
    details: NyaZygisk is part of the manager — no separate Zygisk module to install, and its status sits on the home screen.
    icon: <i class="ri-flashlight-fill"></i>
  - title: KPM support
    details: Load KernelPatch modules with CONFIG_KPM=y, built on the KernelPatch foundation.
    icon: <i class="ri-plug-fill"></i>
    link: ./guide/build.md
  - title: Hiding built in
    details: SUSFS management with one-tap root hiding, plus mount view hiding in the extension center.
    icon: <i class="ri-eye-off-fill"></i>
  - title: Dual UI and themes
    details: Miuix or Material 3 Expressive, a Miuix splash screen, and a Theme Store with mirrors and review.
    icon: <i class="ri-palette-fill"></i>
---
