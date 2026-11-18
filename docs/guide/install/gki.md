# Generic GKI Devices

GKI 2.0 devices (kernel 5.10 and above) can load KazeSU as a kernel module, so
you do not need to build a kernel. Identify your kernel version and KMI first,
then read the [general installation guide](../install.md).

## LKM installation {#lkm}

1. Install the KazeSU manager from [Releases](https://github.com/KazeSU/KazeSU/releases)
   and grant it root through your current root solution.
2. Tap **Not Installed** on the home screen to open the installation screen.
3. Choose **LKM patching/installation**.
4. Select the `boot`, `init_boot` or `vendor_boot` image matching the installed
   firmware.
5. The manager selects the LKM from the system KMI, patches the image and writes
   `lkm-patched.img` to the download directory.
6. Flash the patched image to the same partition and reboot.
7. Open the manager again and confirm that it reports KazeSU as installed.

::: info
`vendor_boot` patching is only needed on a few devices. Normally only
`init_boot` (Android 13+) or `boot` needs to be patched.
:::

::: warning
The image and the target partition must match. Back up important data and keep
stock images and recovery tools before flashing.
:::

## KMI notes {#kmi}

The LKM must match the KMI of the running kernel — for example
`android12-5.10`, `android13-5.15` or `android14-6.1`. If the manager has no LKM
for your KMI, build the kernel with KazeSU integrated instead.

## Building the kernel instead {#built-in}

See the [Google documentation](https://source.android.com/docs/setup/build/building-kernels)
and the [KazeSU build guide](../build.md) for the GKI build workflow.
