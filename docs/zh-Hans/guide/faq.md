# 常见问题

## 管理器识别不到 ROOT {#no-root}

先确认刷入的内核确实包含 KazeSU，并且与管理器版本匹配。如果使用的是 LKM，请确认修补后的
镜像刷入了正确的分区并已重启；管理器不应再显示 **未安装**。

在第三方 KernelSU 或 SukiSU 内核上，管理器以兼容模式运行——请先在现有管理器中授予它
ROOT。

## 内核把 APK 判为非官方版本 {#unofficial-apk}

Debug、PR 与 CI 构建使用与正式版不同的签名证书。请安装
[Releases](https://github.com/KazeSU/KazeSU/releases) 中以 `-release.apk` 结尾的官方
APK。

## KPM 加载失败 {#kpm}

- 内核必须开启 `CONFIG_KPM=y`，该选项默认关闭。
- Non-GKI 内核还需要 `CONFIG_KALLSYMS=y` 与 `CONFIG_KALLSYMS_ALL=y`。
- 低于 4.19 的内核需要从 4.19 回溯 `set_memory.h`。
- KPM 需要 64 位内核。

APatch 兼容层仍在完善中，因此部分模块可能暂时无法使用。

## 内核编译失败 {#build-fails}

最常见的原因是缺少依赖。`CONFIG_KSU` 需要 `CONFIG_KPROBES=y` 与 `CONFIG_EXT4_FS=y`。
如果关闭了 `CONFIG_KALLSYMS_ALL`，而内核代码又依赖导出符号，也可能出现编译错误或无法开机。

请确认内核版本不低于 4.14，并先执行[编译指南](./build.md#setup)中的清理命令，再重新集成。

## 模块不工作 {#module-not-working}

LSPosed、ZygiskNext 等需要修改 sepolicy 的模块，要求内核与管理器版本相互兼容。请使用同一
Release 中的内核与管理器，不要混用不同版本的构建。

## 在哪里反馈问题？ {#report}

请在 [KazeSU Issue 跟踪器](https://github.com/KazeSU/KazeSU/issues)提交 Issue，并附上：

- 设备型号与 Android 版本
- 内核版本与 KMI
- 管理器版本，以及 APK 的来源
- 内核是自行编译集成 KazeSU，还是通过 LKM 修补
- 如果设备能开机，附上 `logcat` 与 `dmesg`

## 在哪里参与翻译？ {#translate}

翻译通过 [Weblate](https://hosted.weblate.org/projects/sukisu-ultra/) 进行，也欢迎只修改
翻译文件的 Pull Request。
