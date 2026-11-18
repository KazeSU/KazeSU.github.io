# Non-GKI 设备

Non-GKI 内核高度碎片化，需要针对设备进行集成与编译，不存在通用的镜像。

::: warning
在继续之前，你必须能够从源码编译出可启动的内核。如果设备内核源码不完整甚至完全不可用，
这一步可能无法完成。
:::

## 开始之前 {#before}

- 内核版本 4.14 或更高。经过回溯移植，3.4–3.18 内核也可以使用。
- 完整、可编译的设备内核源码。
- 可用的 Recovery，以及原厂启动镜像的备份。

## 集成 KazeSU {#integrate}

在内核源码根目录执行：

```sh
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -
```

然后在 defconfig 中开启：

```diff
+CONFIG_KSU=y
+CONFIG_KPROBES=y
+CONFIG_EXT4_FS=y
```

KazeSU 依赖 `KPROBES` 与 `EXT4_FS`。如果需要在 64 位内核上使用 KernelPatch 模块，
再加上 `CONFIG_KPM=y`；如果用户空间需要手动控制 `su`，再加上 `CONFIG_KSU_MANUAL_SU=y`。

编译并刷入内核，然后安装管理器。

完整流程（包括 GKI 编译、清理与 SUSFS 说明）见[编译内核](../build.md)。

## 已有社区内核 {#community}

其他开发者编译的内核可能已经内置了 KernelSU 系 ROOT。刷入前请先确认内核里究竟集成了什么；
如果不是 KazeSU，管理器会以兼容模式运行，直到你自行编译内核。
