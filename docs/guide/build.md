# Building KazeSU into your kernel {#introduction}

::: info
Parts of this document are adapted from the
[KernelSU documentation](https://kernelsu.org) and the
[ReSukiSU documentation](https://github.com/ReSukiSU/ReSukiSU.github.io).
:::

KazeSU can be integrated into GKI, non-GKI and older kernels. The tree has been
backported to 3.4 and earlier, but the further you go from GKI the more work the
kernel source will need.

Non-GKI kernels are fragmented, so there is no universal build recipe and no
generic boot image. You need to be able to build a bootable kernel from your
device's source first.

## Add KazeSU to the kernel source {#setup}

Run this in the **root of your kernel source**:

```sh
# Latest tag (recommended)
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -

# A specific branch or tag
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -s dev
```

The script clones KazeSU next to your kernel, symlinks `drivers/kernelsu` and
adds the `Makefile` / `Kconfig` entries.

To undo it:

```sh
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -s --cleanup
```

## Enable the config options {#config}

The defconfig may live at `arch/arm64/configs/` or
`arch/arm64/configs/vendor/<your_defconfig>`.

```diff
+# KazeSU
+CONFIG_KSU=y
+CONFIG_KPROBES=y
+CONFIG_EXT4_FS=y
```

`KPROBES` and `EXT4_FS` are hard dependencies of the module — enable both or the
kernel will not compile.

For the optional features:

| Option | What it enables |
| --- | --- |
| `CONFIG_KPM=y` | KPM (KernelPatch modules) on 64-bit kernels. |
| `CONFIG_KSU_MANUAL_SU=y` | Manual `su`, authorized through `prctl`. |
| `CONFIG_KSU_DISABLE_MANAGER=n` | Manager APK detection (leave enabled). |
| `CONFIG_KSU_X86_PATCH_SYSCALL_DISPATCHER=y` | x86_64 LKM syscall hooks without a source patch. |

Non-GKI kernels that need KPM must also enable `CONFIG_KALLSYMS=y` and
`CONFIG_KALLSYMS_ALL=y`. Kernels below 4.19 need `set_memory.h` backported from
4.19.

## Build a GKI kernel {#gki}

::: warning
This part is for GKI devices.
:::

### Sync the kernel source {#sync}

```sh
repo init -u https://android.googlesource.com/kernel/manifest
mv <kernel_manifest.xml> .repo/manifests
repo init -m manifest.xml
repo sync
```

`<kernel_manifest.xml>` identifies one exact build. Download it from the
[GKI release builds](https://source.android.com/docs/core/architecture/kernel/gki-release-builds)
page.

### Build {#build}

Read [Building kernels](https://source.android.com/docs/setup/build/building-kernels)
first. For an `aarch64` image:

```sh
LTO=thin BUILD_CONFIG=common/build.config.gki.aarch64 build/build.sh
```

Keep `LTO=thin`; the default may need more than 24 GB of RAM. From Android 13
onwards the kernel is built with Bazel:

```sh
tools/bazel build --config=fast //common:kernel_aarch64_dist
```

## SUSFS {#susfs}

::: warning
SUSFS is not supported on non-GKI kernels out of the box. Backport the patches
from the `gki-android12-5.10` branch of the
[SUSFS repository](https://gitlab.com/simonpunk/susfs4ksu) if you need it.
:::

KazeSU's SUSFS kernel code is updated from the SUSFS repository. If you hit build
errors or boot problems, check the SUSFS update log first. If KazeSU has not
picked up the fix yet, open an issue.

Enable it in your defconfig:

```diff
+CONFIG_KSU_SUSFS=y
```

Then pick the branch matching your kernel version in the SUSFS repository, apply
the kernel-side patches, and rebuild.

## Build the manager and `ksud` {#userspace}

From the KazeSU repository:

```sh
just bm   # cross-build ksud (aarch64) + bundled debug manager APK
just bk   # ksud only
```

`ksud` is built with [`cross`](https://github.com/cross-rs/cross) for
`aarch64-linux-android`. The manager is a Gradle/Kotlin project under
`manager/`; the kernel module builds from `kernel/`.
