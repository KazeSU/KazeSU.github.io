# FAQ

## The manager does not recognize root {#no-root}

Check that the flashed kernel actually contains KazeSU and matches the manager
version. If you loaded the LKM, confirm that you flashed the patched image to the
right partition and rebooted; the manager should no longer say **Not Installed**.

On a third-party KernelSU or SukiSU kernel, the manager runs in compat mode —
grant it root in your current manager first.

## The kernel rejects the APK as unofficial {#unofficial-apk}

Debug, PR and CI builds are signed with a different certificate from the release
build. Install the official APK from
[Releases](https://github.com/KazeSU/KazeSU/releases), the file ending in
`-release.apk`.

## KPM fails to load {#kpm}

- The kernel must be built with `CONFIG_KPM=y`; it is off by default.
- Non-GKI kernels also need `CONFIG_KALLSYMS=y` and `CONFIG_KALLSYMS_ALL=y`.
- Kernels below 4.19 need `set_memory.h` backported from 4.19.
- KPM requires a 64-bit kernel.

The APatch compatibility layer is still in progress, so some modules may not
work yet.

## Kernel compilation fails {#build-fails}

The most common cause is a missing dependency. `CONFIG_KSU` needs
`CONFIG_KPROBES=y` and `CONFIG_EXT4_FS=y`. If `CONFIG_KALLSYMS_ALL` is disabled
and the kernel code expects exported symbols, build errors or boot failures can
follow as well.

Check that your kernel is 4.14 or newer, and re-run the cleanup command from the
[build guide](./build.md#setup) before integrating again.

## A module does not work {#module-not-working}

Modules that change sepolicy, such as LSPosed or ZygiskNext, need the kernel and
the manager to come from a compatible version. Flash the kernel and install the
manager from the same release instead of mixing builds.

## Where do I report a bug? {#report}

Open an issue on the [KazeSU issue tracker](https://github.com/KazeSU/KazeSU/issues)
and include:

- device model and Android version
- kernel version and KMI
- manager version, and where the APK came from
- whether the kernel was built with KazeSU or patched with the LKM
- `logcat` and `dmesg` output if the device boots

## Where do I translate? {#translate}

Translations are handled on
[Weblate](https://hosted.weblate.org/projects/sukisu-ultra/). Pull requests that
only change translation files are welcome too.
