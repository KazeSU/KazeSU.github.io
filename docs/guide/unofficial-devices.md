---
gitChangelog: false
---

# Unofficially supported devices {#unofficial-devices}

::: warning
This page lists kernels and projects maintained by **other developers** that
already integrate KazeSU. They are not part of the KazeSU release process.
:::

::: warning
A listing here is **not** a review or an endorsement. KazeSU developers have not
verified these builds — flash them at your own risk, and keep a backup of your
stock boot image.
:::

::: info
Maintain a kernel with KazeSU? [Open an **Add Device** issue][issue] with the
repository URL and the devices it covers. The page is updated automatically
when the issue is labeled `add-device` and the generated pull request is merged.
:::

::: tip
Some of these projects still use **OriginSU** in their names and READMEs.
OriginSU is KazeSU's former name, so those builds already ship KazeSU.
:::

<script setup>
import data from '../repos.json'
</script>

<table>
  <thead>
    <tr>
      <th>Maintainer</th>
      <th>Repository</th>
      <th>Supported devices</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="repo in data" :key="repo.kernel_link">
      <td><a :href="repo.maintainer_link" target="_blank" rel="noreferrer">{{ repo.maintainer }}</a></td>
      <td><a :href="repo.kernel_link" target="_blank" rel="noreferrer">{{ repo.kernel_name }}</a></td>
      <td>{{ repo.devices }}</td>
    </tr>
    <tr v-if="data.length === 0">
      <td colspan="3" align="center">No devices listed yet — be the first to add one.</td>
    </tr>
  </tbody>
</table>

## Add your device {#add-device}

1. Make sure your kernel repository is public and actually supports KazeSU.
2. Open the [Add Device issue][issue] and fill in the form.
3. Wait for the workflow to open a pull request; a maintainer reviews and merges it.

Entries are stored in [`docs/repos.json`](https://github.com/KazeSU/KazeSU.github.io/blob/main/docs/repos.json),
so a hand-written pull request is welcome too.

[issue]: https://github.com/KazeSU/KazeSU.github.io/issues/new?template=add_device.yml
