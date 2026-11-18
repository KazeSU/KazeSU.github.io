# 通用 GKI 设备

GKI 2.0 设备（内核 5.10 及以上）可以把 KazeSU 作为内核模块加载，无需自行编译内核。开始前
请先确认内核版本与 KMI，然后阅读[安装总览](../install.md)。

## LKM 安装 {#lkm}

1. 从 [Releases](https://github.com/KazeSU/KazeSU/releases) 安装 KazeSU 管理器，并通过
   当前的 ROOT 方案授予它 ROOT。
2. 在首页点击 **未安装**，进入安装界面。
3. 选择 **LKM 修补/安装**。
4. 选择与当前固件匹配的 `boot`、`init_boot` 或 `vendor_boot` 镜像。
5. 管理器会根据系统 KMI 选择 LKM，修补镜像，并把 `lkm-patched.img` 写入下载目录。
6. 将修补后的镜像刷入同一分区并重启。
7. 再次打开管理器，确认已显示 KazeSU 安装完成。

::: info
只有少数设备需要修补 `vendor_boot`。通常只需要处理 `init_boot`（Android 13+）或
`boot`。
:::

::: warning
镜像与目标分区必须对应。刷写前请备份重要数据，并准备好原厂镜像与救砖工具。
:::

## KMI 说明 {#kmi}

LKM 必须与运行中内核的 KMI 匹配，例如 `android12-5.10`、`android13-5.15` 或
`android14-6.1`。如果管理器里没有对应 KMI 的 LKM，请改为编译集成 KazeSU 的内核。

## 改为编译内核 {#built-in}

GKI 内核的编译流程请参考
[Google 官方文档](https://source.android.com/docs/setup/build/building-kernels)与
[KazeSU 编译指南](../build.md)。
