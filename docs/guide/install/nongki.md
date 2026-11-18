# Non-GKI Devices

Non-GKI kernels are fragmented and need device-specific integration and
compilation. There is no generic image that works across devices.

::: warning
You need a bootable kernel built from source before you can continue. On devices
without complete kernel source, that may not be possible.
:::

## Before you start {#before}

- Kernel 4.14 or newer. With backports, 3.4–3.18 kernels can work.
- Complete, buildable kernel source for your device.
- A working recovery and a copy of your stock boot image.

## Integrate KazeSU {#integrate}

Run this in the root of your kernel source tree:

```sh
curl -LSs "https://raw.githubusercontent.com/KazeSU/KazeSU/main/kernel/setup.sh" | bash -
```

Then enable the options in your defconfig:

```diff
+CONFIG_KSU=y
+CONFIG_KPROBES=y
+CONFIG_EXT4_FS=y
```

KazeSU depends on `KPROBES` and `EXT4_FS`. Add `CONFIG_KPM=y` on 64-bit kernels
if you want KernelPatch modules, and `CONFIG_KSU_MANUAL_SU=y` if your userspace
needs manual `su` control.

Build and flash the kernel, then install the manager.

The full walkthrough — including GKI builds, cleanup and SUSFS notes — is on the
[Building Kernel](../build.md) page.

## Existing community kernels {#community}

Kernels built by other developers may already include a KernelSU-based root.
Check what the kernel ships before flashing; if it is not KazeSU, the manager
will run in compat mode until you build your own kernel.
