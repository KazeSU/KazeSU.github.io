# Installing KazeSU {#install}

::: tip
This guide assumes you already know how to flash images and recover from a bad
flash. Keep stock images and a working recovery around.
:::

## Get the manager {#get-manager}

Download the APK from [Releases](https://github.com/KazeSU/KazeSU/releases). The
file you want ends in `-release.apk`:

```
KazeSU_<version>_<code>-<abi>-release.apk
```

::: warning
Debug, PR and CI builds are signed with a different certificate. The kernel
rejects them as unofficial, so install only the official release APK.
:::

## Choose how to install root {#choose}

| Scenario | What to do |
| --- | --- |
| Your kernel already has KazeSU built in | Install the manager and open it. |
| GKI device (kernel 5.10+) | Load the LKM from the manager, or flash a KazeSU kernel. |
| Non-GKI / older kernel | [Build a kernel](./build.md) with KazeSU integrated. |
| Another KernelSU-based root is installed | Install the manager and grant it root in your current manager; it runs in compat mode. |

### Compatibility mode {#compat-mode}

On a third-party KernelSU or SukiSU kernel, the manager runs in compat mode:
grant it root in your existing manager and you keep modules, flashing and reboot
support. Kernel-side features — KPM, SUSFS and the rest of the kernel extension
center — need a KazeSU kernel.

## LKM installation {#lkm}

If your kernel does not have KazeSU built in yet, the manager can patch a boot
image with the LKM:

1. Install the manager and grant it root through your current root solution.
2. Tap **Not Installed** and choose **LKM patching/installation**.
3. Select the `boot`, `init_boot` or `vendor_boot` image that matches your
   installed firmware.
4. The manager picks the LKM matching your system KMI, patches the image and
   writes `lkm-patched.img` to the download directory.
5. Flash that image to the same partition, reboot, and open the manager again.

The full walkthrough, including KMI notes, is on the
[Generic GKI Devices](./install/gki.md) page.

## Kernel / AnyKernel3 installation {#builtin}

The manager also flashes AnyKernel3 packages. This option only appears once the
manager has root, so install the LKM first if the manager reports that root is
not available.

To patch a boot image by hand instead, use `magiskboot`:

1. Get the stock `boot.img` for your exact firmware build. `payload-dumper-go`
   can extract it from an OTA package.
2. Unpack the AnyKernel3 package and take its `Image` file.
3. Unpack the stock image, replace `kernel` with `Image`, and repack:

```sh
./magiskboot unpack boot.img
mv -f Image kernel
./magiskboot repack boot.img
```

4. Flash the resulting `new-boot.img` with fastboot.

::: info
The official `magiskboot` binary runs on Android and on Linux. On Windows or
macOS, use a [community build](https://github.com/ookiineko/magiskboot_build/releases/tag/last-ci).
:::

::: danger
The image and the target partition must match. A mismatched boot image is the
quickest way to a device that will not boot.
:::
