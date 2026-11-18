# 把 KazeSU 编译进内核 {#introduction}

::: info
本文部分内容改编自 [KernelSU 官方文档](https://kernelsu.org)与
[ReSukiSU 文档](https://github.com/ReSukiSU/ReSukiSU.github.io)。
:::

KazeSU 可以集成到 GKI、Non-GKI 以及更旧的内核中。代码已经回溯到 3.4 及更早版本，但离 GKI
越远，内核源码需要的改动就越多。

Non-GKI 内核碎片化严重，没有通用的编译方案，也没有通用启动镜像。你首先需要能从设备内核源码
编译出可启动的内核。

## 把 KazeSU 加入内核源码 {#setup}

在内核源码**根目录**执行：

```sh
# 最新标签（推荐）
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -

# 指定分支或标签
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -s dev
```

脚本会把 KazeSU 克隆到内核旁边，创建 `drivers/kernelsu` 软链接，并写入 `Makefile` 与
`Kconfig` 条目。

需要撤销时：

```sh
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -s --cleanup
```

## 开启配置项 {#config}

defconfig 可能位于 `arch/arm64/configs/` 或
`arch/arm64/configs/vendor/<你的 defconfig>`。

```diff
+# KazeSU
+CONFIG_KSU=y
+CONFIG_KPROBES=y
+CONFIG_EXT4_FS=y
```

`KPROBES` 与 `EXT4_FS` 是模块的硬性依赖，缺少任一配置都无法编译。

可选功能：

| 配置项 | 作用 |
| --- | --- |
| `CONFIG_KPM=y` | 在 64 位内核上启用 KPM（KernelPatch 模块）。 |
| `CONFIG_KSU_MANUAL_SU=y` | 手动 `su`，通过 `prctl` 授权。 |
| `CONFIG_KSU_DISABLE_MANAGER=n` | 管理器 APK 检测（保持开启）。 |
| `CONFIG_KSU_X86_PATCH_SYSCALL_DISPATCHER=y` | x86_64 上无需修改源码即可实现 LKM 系统调用钩子。 |

需要在 Non-GKI 内核上使用 KPM 时，还必须开启 `CONFIG_KALLSYMS=y` 与
`CONFIG_KALLSYMS_ALL=y`。低于 4.19 的内核需要从 4.19 回溯 `set_memory.h`。

## 编译 GKI 内核 {#gki}

::: warning
本节针对 GKI 设备。
:::

### 同步内核源码 {#sync}

```sh
repo init -u https://android.googlesource.com/kernel/manifest
mv <kernel_manifest.xml> .repo/manifests
repo init -m manifest.xml
repo sync
```

`<kernel_manifest.xml>` 对应一次确定的构建。可以从
[GKI 发布构建](https://source.android.com/docs/core/architecture/kernel/gki-release-builds)
页面下载。

### 开始编译 {#build}

请先阅读 [Building kernels](https://source.android.com/docs/setup/build/building-kernels)。
编译 `aarch64` 镜像：

```sh
LTO=thin BUILD_CONFIG=common/build.config.gki.aarch64 build/build.sh
```

务必保留 `LTO=thin`，否则内存不足 24 GB 的机器可能编译失败。从 Android 13 开始，内核使用
Bazel 编译：

```sh
tools/bazel build --config=fast //common:kernel_aarch64_dist
```

## SUSFS {#susfs}

::: warning
Non-GKI 内核默认不支持 SUSFS。如有需要，请手动从
[SUSFS 仓库](https://gitlab.com/simonpunk/susfs4ksu)的 `gki-android12-5.10` 分支回溯补丁。
:::

KazeSU 的 SUSFS 内核代码跟随 SUSFS 仓库更新。如果遇到编译错误或开机问题，请先查看 SUSFS
仓库的更新日志；如果 KazeSU 尚未同步修复，请提交 Issue。

在 defconfig 中开启：

```diff
+CONFIG_KSU_SUSFS=y
```

然后在 SUSFS 仓库中选择与内核版本匹配的分支，应用内核侧补丁并重新编译。

## 编译管理器与 `ksud` {#userspace}

在 KazeSU 仓库中执行：

```sh
just bm   # 交叉编译 ksud（aarch64）+ 内置调试版管理器 APK
just bk   # 只编译 ksud
```

`ksud` 通过 [`cross`](https://github.com/cross-rs/cross) 为
`aarch64-linux-android` 编译。管理器是 `manager/` 下的 Gradle/Kotlin 项目，内核模块从
`kernel/` 编译。
