# 关于 KazeSU

## KazeSU 是什么？ {#what-is-kazesu}

KazeSU 是一个基于内核的 Android ROOT 方案。内核负责授予 ROOT，管理器负责其余的一切。

它源自 [KernelSU](https://github.com/tiann/KernelSU)，经
[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra) 与
[SukiSU Nova](https://github.com/SukiSU-Nova/SukiSU-Nova) 一路演进。KernelSU
的支持范围是起点，而不是上限：App Profile、KPM、内置 Zygisk、主题商店、SUSFS
工具和内核扩展中心都集成在同一个管理器里，而不是分散在一堆配套应用中。

## 管理器里有什么 {#toolkit}

- **内核级 `su`**：支持按应用配置权限与临时 ROOT 授权。
- **[App Profile](https://sukisu.org/guide/app-profile)**：把 ROOT 权限关进笼子里，
  而不是交给整台设备。
- **KPM**：通过 `CONFIG_KPM=y` 加载 KernelPatch 模块，APatch 兼容层仍在完善中。
- **内置 Zygisk（NyaZygisk）**：无需另装 Zygisk 模块，运行状态直接显示在首页。
- **主题商店**：浏览、安装与投稿主题，支持多源镜像、作者授权与审核。
- **内核扩展中心**：CPU/vvar 伪装、AVC 日志伪装、版本伪装、SUSFS 与挂载视图隐藏，
  集中在一处管理。
- **SUSFS 管理**：一键配置 ROOT 隐藏。
- **双 UI**：Miuix 或 Material 3 Expressive，支持 Miuix 启动图、模块横幅与排序，
  以及无需内核的预览模式。

## 兼容范围 {#compatibility}

KazeSU 从上游分叉后独立演进，兼容性以本仓库的测试结果为准，不再等同于 KernelSU
官方的支持范围。

- GKI 2.0 设备（内核 5.10 及以上）开箱即用。
- 较旧的内核（最低 4.14+）同样可用，但需要自行编译内核。
- 经过额外回溯移植，可支持 3.4–3.18 内核。
- 支持的架构：`arm64-v8a`、`armeabi-v7a`、`x86_64`、`riscv64`。

集成步骤见[编译内核](./build.md)。

## 致谢 {#credits}

没有以下项目，就没有 KazeSU：

- [KernelSU](https://github.com/tiann/KernelSU)：上游项目。
- [SukiSU Nova](https://github.com/SukiSU-Nova/SukiSU-Nova) 与
  [SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)：本分支所基于的
  分叉脉络。
- [/xxksu](https://github.com/backslashxx/KernelSU)：内核兼容性参考。
- [susfs4ksu](https://gitlab.com/simonpunk/susfs4ksu)：隐藏补丁与用户空间模块。
- [KernelPatch](https://github.com/bmax121/KernelPatch)：KPM 的基础。

翻译工作通过 [Weblate](https://hosted.weblate.org/projects/sukisu-ultra/) 进行，
问题请提交到 [Issue 跟踪器](https://github.com/KazeSU/KazeSU/issues)。

## 许可证 {#license}

- `kernel/` 目录使用 GPL-2.0-only。
- 动漫风格的 `ic_launcher*` 图标由 怡子曰曰 绘制、明风OuO 持有版权，适用
  `LICENSE_icon_English` / `LICENSE_icon_SC` 中的特殊条款。
- KazeSU 叶片 Logo 为本项目的原创作品。
- 其余部分使用 GPL-3.0-or-later。
