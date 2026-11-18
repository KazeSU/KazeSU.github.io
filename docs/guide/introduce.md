# About KazeSU

## What is KazeSU? {#what-is-kazesu}

KazeSU is a kernel-based root solution for Android. The kernel grants root; the
manager does everything around it.

It descends from [KernelSU](https://github.com/tiann/KernelSU) through
[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra) and
[SukiSU Nova](https://github.com/SukiSU-Nova/SukiSU-Nova). KernelSU's scope
was the starting point, not the ceiling: App Profile, KPM, a built-in Zygisk,
themes, SUSFS tooling and the kernel extension center all ship in one manager,
instead of a pile of companion apps.

## What is in the manager {#toolkit}

- **Kernel-based `su`** with per-app profiles and temporary root grants.
- **[App Profile](https://sukisu.org/guide/app-profile)** — keep root access in a
  cage instead of handing it to the whole device.
- **KPM** — KernelPatch modules, enabled with `CONFIG_KPM=y`, with an APatch
  compatibility layer still in progress.
- **Built-in Zygisk (NyaZygisk)** — no separate Zygisk module, and its running
  status is shown on the home screen.
- **Theme Store** — browse, install and submit themes, with multi-source
  mirrors, author authorization and review.
- **Kernel Extension Center** — CPU/vvar spoofing, AVC log spoofing, version
  spoofing, SUSFS and mount view hiding in one place.
- **SUSFS management** — one-tap root hiding configuration.
- **Dual UI** — Miuix or Material 3 Expressive, a Miuix splash screen, module
  banners and sorting, and a kernel-free preview mode.

## Compatibility scope {#compatibility}

KazeSU evolved independently after forking, so compatibility is based on testing
in this repository. It no longer equals the official KernelSU support scope.

- GKI 2.0 devices (kernel 5.10+) are supported out of the box.
- Older kernels (minimum 4.14+) work, but you must build the kernel yourself.
- With backports, 3.4–3.18 kernels can be supported.
- Architectures: `arm64-v8a`, `armeabi-v7a`, `x86_64`, `riscv64`.

See [Building Kernel](./build.md) for the integration steps.

## Credits {#credits}

KazeSU would not exist without the work below:

- [KernelSU](https://github.com/tiann/KernelSU) — the upstream project.
- [SukiSU Nova](https://github.com/SukiSU-Nova/SukiSU-Nova) and
  [SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra) — the fork
  lineage this branch is rebased on.
- [/xxksu](https://github.com/backslashxx/KernelSU) — kernel compatibility
  reference.
- [susfs4ksu](https://gitlab.com/simonpunk/susfs4ksu) — hiding patches and
  userspace modules.
- [KernelPatch](https://github.com/bmax121/KernelPatch) — the KPM foundation.

Translations live on [Weblate](https://hosted.weblate.org/projects/sukisu-ultra/).
Bug reports belong in the [issue tracker](https://github.com/KazeSU/KazeSU/issues).

## License {#license}

- `kernel/` is licensed under GPL-2.0-only.
- The anime `ic_launcher*` artwork is covered by `LICENSE_icon_English` /
  `LICENSE_icon_SC`, drawn by 怡子曰曰 and owned by 明风OuO.
- The KazeSU leaf logo is original artwork for this project.
- Everything else is GPL-3.0-or-later.
