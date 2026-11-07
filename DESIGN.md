---
name: Notes Studio
description: 明亮书房里的 Markdown 写作台 —— 纸本亮色、墨水排版、信号橙
colors:
  paper: "#f5f1e8"
  paper-deep: "#ece6d9"
  card: "#ffffff"
  ink: "#111111"
  muted: "#8c877d"
  accent: "#ff4d00"
  hairline: "rgba(17, 17, 17, 0.14)"
  hairline-strong: "rgba(17, 17, 17, 0.28)"
typography:
  display:
    fontFamily: "YouSheBiaoTiHei, Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  editor:
    fontFamily: "Geist Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    lineHeight: 1.7
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "24px"
  lg: "32px"
components:
  note-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  note-card-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
  button-new:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
  field-search:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
---

# Design System: Notes Studio

## Overview

**Creative North Star: "The Bright Study（明亮书房）"**

Notes Studio 是主站暗色「剪辑台」世界的亮色镜像：同样的墨黑与信号橙，把墨黑铺在纸上而不是夜里。整个应用是一间采光充足的书房 —— 台面是暖纸白（#f5f1e8），卡片是一页页纯白的稿纸，文字是吸足墨水的近黑，唯一的强调色是同一支信号橙（#ff4d00），像书签绳一样只做标记。

密度克制、层级靠发丝线（hairline）而不是阴影。排版承担全部表现力：编辑侧是安静的等宽字稿纸，预览侧是 16px / 1.6 行高的杂志级阅读排版。深度完全由「纸叠纸」表达：纸白台面 → 纯白卡片，永远不用投影。

**Key Characteristics:**
- 亮色纸本世界，与主站暗色同源翻转（同一支橙、同一组字体、同一条发丝线纪律）
- 橙色是唯一信号色：选中标记、列表圆点、引用线、链接，永远不做大面积填充
- 深度靠纸面层次（paper → paper-deep → card），零阴影
- 直角世界：全站零圆角，边界一律 1px 发丝线

## Colors

一组「纸、墨、橙」三色戏剧：暖纸白打底，近黑做字，橙色做唯一的记号。

### Primary
- **Signal Orange 信号橙** (#ff4d00): 唯一强调色。用途：选中笔记左侧 3px 粗线、列表圆点、blockquote 左线、链接、焦点描边。面积永远小（<5%），它的稀有就是它的意义。

### Neutral
- **Warm Paper 暖纸白** (#f5f1e8): 全局台面底色，body 背景。不是纯白 —— 纸的暖意来自这一点米黄。
- **Paper Deep 深纸白** (#ece6d9): 次级纸面（侧栏分区、表头底、新建按钮底）。
- **Card Pure 纯白稿纸** (#ffffff): 笔记卡片、搜索框、一切「可写的纸」。
- **Ink 墨黑** (#111111): 全部正文与标题文字。
- **Muted 灰墨** (#8c877d): 辅助文字、时间戳、mono 标签、占位符。
- **Hairline 发丝线** (rgba(17,17,17,0.14)): 全站唯一描边色；强态 0.28 用于选中卡片边框。

### Named Rules
**The One Mark Rule.** 橙色只做「记号」不做「底色」：一根线、一个点、一条引用边。禁止大面积橙色填充背景。

**The Paper Stack Rule.** 层次用纸面颜色表达：paper（台面）→ paper-deep（次级区）→ card（稿纸）。永远不用 box-shadow 表达深度。

## Typography

**Display Font:** YouSheBiaoTiHei（品牌标题，仅侧栏品牌行「笔记」二字）
**Body Font:** Geist（system-ui 兜底）
**Editor/Label Font:** Geist Mono（JetBrains Mono 兜底）

**Character:** 三声部体系 —— YouShe 的海报体只在一个地方出现（品牌行），Geist 承担阅读排版，Geist Mono 承担「机器感」的注脚（时间戳、语言铭牌、PREVIEW 标签）。写作用的字（等宽 13px）和读出来的字（Geist 16px）刻意区分：写是草稿，读是成刊。

### Hierarchy
- **Display** (YouSheBiaoTiHei, 1.125rem): 仅品牌行。
- **Headline** (600, 1.875rem / 1.375rem / 1.125rem): md-prose 的 h1（带下边线）/ h2 / h3。
- **Body** (400, 1rem, 1.6 行高, ≤68ch): 预览侧全部阅读文字，杂志级。
- **Editor** (400, 0.8125rem, 1.7 行高): 左侧 textarea 与标题正文，等宽。
- **Label** (400, 0.625rem, 0.08em 字距, 大写): mono-label —— PREVIEW、语言铭牌、时间戳。

### Named Rules
**The Draft vs Print Rule.** 编辑侧永远等宽 13px（草稿感），预览侧永远 Geist 16px/1.6（印刷感）。两侧不互换字体。

## Layout

双栏书写台 + 侧栏书架的三段结构：侧栏 w-72 固定宽（移动端顶置、≤45vh），主区左右等分（编辑 | 预览，各带 12px 头部栏）。间距节奏 24px（区块）/ 8px（行内）。预览内容 max-width 68ch 居中，像一页排好的版。

响应式断点 max-lg（<1024px）：三段变纵向堆叠 —— 书架顶置、编辑区中段、预览区底段。

## Elevation & Depth

零阴影体系。深度完全由纸面颜色的三层堆叠表达（paper → paper-deep → card），边界一律 1px 发丝线。选中态用边框加深（0.14 → 0.28）+ 橙色粗线，不用任何投影或浮起。

### Named Rules
**The Flat Desk Rule.** 台面是平的。任何组件在任何状态下都不允许出现 box-shadow。

## Shapes

直角世界：全站 border-radius 0。卡片的锐利边缘是「纸」的一部分 —— 纸不倒角。焦点态用橙色描边（rgba(255,77,0,0.55)）而不是圆角光环。

## Components

### Note Card（笔记卡片 · 签名组件）
- **Shape:** 直角，1px 发丝线边框
- **Background:** 纯白 card；标题 14px 墨黑，时间戳 mono-label 灰墨
- **Active:** 边框加深至 0.28 + 左侧 3px 信号橙竖线（absolute inset-y-0）
- **删除:** 默认隐藏，hover/focus 显现，橙色调

### Search Field
- **Style:** 纯白底、1px 发丝线、13px、放大镜图标灰墨
- **Focus:** 边框转橙 rgba(255,77,0,0.55)

### New Button
- **Style:** paper-deep 底、发丝线边框、1.5px stroke 加号图标；hover 边框加深

### Editor Pane
- **标题栏:** h-12、无边框底色、底部 1px 发丝线、YouShe 字体
- **正文:** 等宽 13px/1.7、透明底、无内嵌边框（稿纸本身即边界）

### Code Block（md-code-wrap）
- **Style:** #f4f4f4 浅灰底、1px 发丝线、直角；oneLight 亮色语法着色
- **铭牌:** 右上角 mono-label 语言标签（TS/JS…）
- **禁止:** 黑色/深色代码块（本世界为严格亮色）

## Do's and Don'ts

### Do:
- **Do** 用纸面三层色（paper/paper-deep/card）表达一切层次。
- **Do** 橙色只做记号：选中线（3px）、列表点、引用边（2px）、焦点描边（0.55 alpha）。
- **Do** 预览排版遵守 16px / 1.6 行高 / ≤68ch。
- **Do** 所有边界用 1px 发丝线 rgba(17,17,17,0.14)。

### Don't:
- **Don't** 使用任何 box-shadow 或投影。
- **Don't** 使用深色/黑色代码块 —— 代码高亮必须是亮色主题（oneLight）。
- **Don't** 圆角 —— 全站直角。
- **Don't** 给橙色大面积填充（按钮底、区块底）。
- **Don't** 用 emoji 图标 —— 图标一律 1.5px stroke 细线 SVG。
