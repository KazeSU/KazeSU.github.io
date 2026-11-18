---
gitChangelog: false
---

# 非官方支持设备 {#unofficial-devices}

::: warning
本页列出的是由**其他开发者**维护、已经集成 KazeSU 的内核与项目。它们不属于
KazeSU 的发布流程。
:::

::: warning
出现在这里**不代表**已经过 KazeSU 开发者审核或推荐。这些构建未经我们验证，刷入
风险自负，请务必先备份原厂 boot 镜像。
:::

::: info
你维护的内核支持 KazeSU？请通过[**添加设备** Issue][issue]提交仓库地址和适配的
设备列表。Issue 被打上 `add-device` 标签后，工作流会自动创建 PR，合并后本页即刻更新。
:::

::: tip
部分项目仍在使用 **OriginSU** 这一名称。OriginSU 是 KazeSU 的旧名，这些构建
实际上已经包含 KazeSU。
:::

<script setup>
import data from '../../repos.json'
</script>

<table>
  <thead>
    <tr>
      <th>维护者</th>
      <th>仓库</th>
      <th>支持设备</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="repo in data" :key="repo.kernel_link">
      <td><a :href="repo.maintainer_link" target="_blank" rel="noreferrer">{{ repo.maintainer }}</a></td>
      <td><a :href="repo.kernel_link" target="_blank" rel="noreferrer">{{ repo.kernel_name }}</a></td>
      <td>{{ repo.devices }}</td>
    </tr>
    <tr v-if="data.length === 0">
      <td colspan="3" align="center">还没有设备条目，欢迎成为第一个。</td>
    </tr>
  </tbody>
</table>

## 添加你的设备 {#add-device}

1. 确认你的内核仓库公开，并且确实支持 KazeSU。
2. 打开[添加设备 Issue][issue]并填写表单。
3. 等待工作流自动创建 PR，维护者审核合并后条目即会出现在上表。

数据保存在 [`docs/repos.json`](https://github.com/KazeSU/KazeSU.github.io/blob/main/docs/repos.json)，
你也可以直接手动提交 PR。

[issue]: https://github.com/KazeSU/KazeSU.github.io/issues/new?template=add_device.yml
