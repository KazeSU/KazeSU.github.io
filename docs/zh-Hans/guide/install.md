# 安装 KazeSU {#install}

::: tip
本指南默认你已经会刷写镜像，也知道如何从刷坏的状态中恢复。请提前准备好原厂镜像和可用的
Recovery。
:::

## 获取管理器 {#get-manager}

从 [Releases](https://github.com/KazeSU/KazeSU/releases) 下载 APK。你需要的是文件名以
`-release.apk` 结尾的那个：

```
KazeSU_<版本>_<版本号>-<架构>-release.apk
```

::: warning
Debug、PR 与 CI 构建使用不同的签名证书，内核会将其视为非官方版本而拒绝。请只安装官方
Release APK。
:::

## 选择安装方式 {#choose}

| 场景 | 做法 |
| --- | --- |
| 内核已内置 KazeSU | 安装管理器后直接打开即可。 |
| GKI 设备（内核 5.10+） | 在管理器里加载 LKM，或刷入内置 KazeSU 的内核。 |
| Non-GKI / 旧内核 | [编译内核](./build.md)并集成 KazeSU。 |
| 已安装其他 KernelSU 系 ROOT | 安装管理器，并在现有管理器中授予其 ROOT，以兼容模式运行。 |

### 兼容模式 {#compat-mode}

在第三方 KernelSU 或 SukiSU 内核上，管理器会以兼容模式运行：在现有管理器中授予它 ROOT
后，模块、刷写与重启功能仍然可用。KPM、SUSFS 以及内核扩展中心的其余功能需要 KazeSU
内核才能工作。

## LKM 安装 {#lkm}

如果内核尚未内置 KazeSU，可以让管理器把 LKM 打入启动镜像：

1. 安装管理器，并通过当前的 ROOT 方案授予它 ROOT。
2. 点击 **未安装**，选择 **LKM 修补/安装**。
3. 选择与当前固件匹配的 `boot`、`init_boot` 或 `vendor_boot` 镜像。
4. 管理器会根据系统 KMI 选择对应的 LKM，修补镜像并输出 `lkm-patched.img` 到下载目录。
5. 将输出镜像刷入同一分区，重启后再打开管理器确认。

完整的操作说明（包括 KMI 注意事项）见[通用 GKI 设备](./install/gki.md)。

## 内核 / AnyKernel3 安装 {#builtin}

管理器也能刷写 AnyKernel3 包。该选项只有在管理器获得 ROOT 后才会出现，因此如果管理器提示
没有 ROOT，请先完成 LKM 安装。

如果想手动修补启动镜像，可以使用 `magiskboot`：

1. 获取与当前固件版本完全一致的原厂 `boot.img`。可以用 `payload-dumper-go` 从 OTA
   包中提取。
2. 解压 AnyKernel3 包，取出其中的 `Image` 文件。
3. 解包原厂镜像，用 `Image` 替换 `kernel`，再重新打包：

```sh
./magiskboot unpack boot.img
mv -f Image kernel
./magiskboot repack boot.img
```

4. 用 fastboot 刷入生成的 `new-boot.img`。

::: info
官方 `magiskboot` 可以在 Android 与 Linux 上运行。Windows 或 macOS 用户请使用
[社区构建](https://github.com/ookiineko/magiskboot_build/releases/tag/last-ci)。
:::

::: danger
镜像与目标分区必须对应。刷错启动镜像，是让设备无法开机最快的方式。
:::
