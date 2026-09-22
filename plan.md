# Portfolio 更新计划（Rilla 申请）

> 基于 `/Users/yiqichen/MyWebsite` 在 2026-09-16 的本地内容制定。此文件是修改计划；网站本身尚未改动。项目原先没有 `plan.md`，现已在项目根目录新增，并在当前任务的 `outputs/plan.md` 保留副本。

## 现有网站诊断

- 首页由 `assets/js/router.js` 的 `renderPortfolio()` 生成。目前只有 “Hello, I'm Yiqi.” 和五张纯图片入口；访客看不到项目名称、角色、解决的问题或项目状态。首屏难以判断你与 Product Designer 岗位的关系。
- `data/portfolio-projects.json` 的标题仍是 “Portfolio Project 1–5”。`assets/js/portfolio-detail.js` 仅将图片顺序铺满页面；真实项目标题与文字嵌在图片中，不可搜索、选择或适应小屏阅读。
- 现有精选项目顺序是 Chirp、UnderCurrent、Legends at NYU、Behind the Ad Slot、Dunes Dictionary。前几张封面分别偏硬件/服务设计、反思 App、桌游；最能证明数字产品落地的 Dunes 排在最后。Waybox 还未加入网站。
- `index.html` 与 `portfolio-detail.html` 的导航图标指向不存在的 `ab.png`。`assets/css/site.css` 让桌面导航文字达到 32px；手机端仍需实测。当前图片的 `alt` 文本为 “portfolio 1 cover” 等，不能说明作品内容。
- About 页的定位偏向制度和参与机制，与此次申请要展示的“理解用户、做出高质量 UI、推进产品落地”没有直接连接。现有 `Other Works` 有已实现的 TreeFriend、The Quantum Atlas、Zeroth 和 A Kind Data Collector，可作为实现能力的补充证据。

## 修改顺序与文件位置

### P0：让首页在数秒内说明你是谁、做过什么

1. 在 `assets/js/router.js` 的 `renderPortfolio()` 中，将 “Hello, I'm Yiqi.” 扩展为简短的英文定位和一句可核实的能力说明；让第一张精选作品在常见桌面首屏可见。建议主句：**“I design thoughtful digital products and bring them to life.”** 副句可提 research、interface design 和 prototyping/development，但须对应实际经历。
2. 将手写的五个匿名 `<a>` 改为读取 `data/portfolio-projects.json` 的卡片。每张显示真实项目名、用户/问题、本人职责、状态与一张高质量成品图。`aria-label` 和图片 `alt` 用项目名及画面内容，避免数字占位名。
3. 调整精选顺序，优先验证 **UnderCurrent → Dunes Dictionary → Waybox → Chirp**。UnderCurrent 展示产品 UI 与用户问题；Dunes 展示系统设计和前端落地；Waybox 展示多流程产品判断，但标明进行中。若 Waybox 的最终界面或原型尚不适合公开，则先只放一张次要预览卡，并把已完成的 Behind the Ad Slot 放入第三位。Legends at NYU 与 Chirp 中视觉和证据较弱的一项移到 Other Works，避免首页过长。正式排序以实际案例素材质量为准。
4. 为 Waybox 新增独立项目 ID 和封面素材，不把它挤进旧的编号图片。完成封面、状态及职责文案后再加入首页。卡片示例：**“Waybox · Connected driving companion” / “Designed onboarding, memory, and AI vlog flows” / “Product design · In progress.”** 核实用户研究、硬件与开发贡献后再写更具体的角色。

### P1：将图片长卷改成易扫读的案例

1. 扩展 `data/portfolio-projects.json`：将匿名标题替换成 Chirp、UnderCurrent、Legends at NYU、Behind the Ad Slot、Dunes Dictionary；为每项增加 `summary`、`role`、`status`、`outcome`（仅在有证据时填写）、`coverAlt` 和精选顺序。现有 `images` 可保留作视觉材料。
2. 修改 `portfolio-detail.html` 和 `assets/js/portfolio-detail.js`：在长图之前加入 HTML 形式的项目标题、一句话问题、最终体验图、本人职责、项目状态和可用链接；随后按“证据 → 关键设计取舍 → 迭代 → 交付/局限”组织内容。优先改排在前面的 2–3 篇，不必一次重写所有案例。
3. 对 Waybox 选定一条完整叙事线，例如 Miles 连接与首次使用，或 AI Vlog 再生成与预览确认。展示最终界面、流程图及 2–3 个关键设计决定；把设备激活、权限与数据不完整等恢复状态作为深度证据。只称其为设计方案或原型，除非能提供开发/测试证明。
4. 审核图片内现有文字与 HTML 元数据的一致性。图片长卷中的日期、个人/团队归属和结果陈述如有不准确，应改源图或以明确的页面文字纠正；尤其不要让图片暗示已上线，而正文标为概念项目。

### P2：修好网站本身的 UI craft

1. 在 `index.html`、`portfolio-detail.html` 中将失效的 `ab.png` 改为项目中实际存在且合适的标志资源；检查首页、案例页、Other Works、About 和返回导航。
2. 在 `assets/css/site.css` 与 `assets/css/project-detail.css` 中为卡片标题、说明和状态设计清晰层级；缩小手机端导航占用空间，并确保卡片在窄屏仍能读到文字。避免整页 2880px 图片承载小字号正文：关键文字应转成 HTML。
3. 统一封面视觉：每张首先呈现真实成品或关键 UI，而不是编号、流程图或大段背景文字。尤其为 Behind the Ad Slot 与 Dunes Dictionary 另选突出最终界面的首页缩略图，原图仍可在案例页使用。
4. 检查手机尺寸、键盘导航、图片加载、拼写、外链、简历入口与真实页面内容；修复后再发布。

## 完成标准

- 首页首屏能读到职业定位和第一项作品；不点开项目也能看懂每张卡的项目名、问题、职责与状态。
- 前 2–3 篇案例开头直接显示最终体验，并区分个人贡献、团队贡献、原型和实际落地。
- Waybox 的展示状态与实际证据一致；无未经核实的发布、测试或效果数字。
- 桌面和手机均可顺畅浏览；导航图标存在、链接有效、图片有描述性替代文本。

## 首页目标

让招聘者在几秒内看到三项能力：理解真实用户的问题、独立完成高质量 UI、将设计推进到可用产品。首页本身也应体现这些能力，尤其是视觉细节、清晰导航和手机端体验。

## 首页结构与内容

1. **首屏：一句定位 + 可见作品。** 使用简短英文定位，例如 “Product designer who researches, designs, and builds digital experiences.” 首屏直接露出最强作品的真实界面，避免长篇自我介绍。
2. **精选作品：按证据强度排序。** 优先放能同时证明用户理解、视觉质量和落地能力的项目。每张卡片用大幅、清晰的最终界面，并用一行写明“为谁解决什么问题｜我的职责｜目前状态”。不要把概念稿写成已上线产品。
3. **案例页：先结果，后过程。** 首屏展示最终体验、项目背景、个人职责与状态；随后用少量关键证据解释用户洞察、重要设计取舍、迭代及交付。展示能够说明判断的过程材料，而非堆叠便签和线框图。
4. **明确归属与证据。** 分别标记本人做的研究、UI、原型、前端及团队贡献；写清楚哪些已实现、测试或发布。没有可靠数据时，不写未经验证的效果数字。

## Waybox 是否放上个人网站

**更新结论：Waybox 适合放到个人网站，但现阶段应作为“进行中的产品设计案例”呈现；是否排在首页第一位，取决于最终界面的视觉质量和是否有可演示的原型。** Waybox 项目聊天记录显示，你已持续设计并迭代多个具体流程，足以展示产品判断和 UI 能力；记录没有证实产品已开发、发布或经过用户验证。

目前可从聊天记录确认的设计范围：

- Onboarding：登录后的称呼设置、可选的 Skills 和 Privacy Zone、Miles 设备连接与跳过设置的路径。
- 核心体验：Memory 中的 drive、vlog 与日历状态；Vlog 的自定义、再生成、处理中、预览与确认流程。
- 复杂状态：设备激活、第三方服务授权与权限问题、内容同步或生成中的状态，以及失败后的恢复操作。
- 迭代深度：针对操作文案、按钮层级、信息架构、页面间距和异常路径进行了逐页调整。这些是设计推进的证据，不能单独证明最终方案已实现或通过测试。

**推荐的网站呈现方式：** 首页可以放一张 Waybox 作品卡，前提是选出一张完成度高的真实设计界面，并准备好贯通的主流程原型。卡片可写：

> **Waybox — designing a companion experience for driving memories**  
> Designed onboarding, memory, and AI vlog flows for a connected driving experience.  
> **Role:** [按实际贡献填写] · **Status:** In-progress concept / prototype [按实际状态选择]

案例页聚焦一条最有说服力的故事线，例如“从 Miles 连接到首次生成驾驶回忆”，或“如何让用户安全地修改 AI 生成的 vlog”。开头先展示最终界面和可操作流程，再用 2–3 个关键决策说明问题、方案与迭代：可选设备设置怎样避免阻断使用、AI 再生成为什么需要预览确认、数据不完整时如何向用户解释状态。只展示你实际设计过且能证明的部分。

如果目前还没有高质量的最终界面或贯通原型，先把 Waybox 放在首页次要位置，作为简短预览；完成后再升级为主打案例。不要标注“已上线”“提升了转化”或“用户验证成功”，除非另有证据。

可以按下面的证据决定呈现级别：

| 已有证据 | 网站呈现建议 |
| --- | --- |
| 有稳定可用的核心流程、完成度高的实际界面，且能说明真实用户问题与本人贡献 | 可作为首页主打作品；清楚标注发布或测试状态 |
| 有较完整的界面和可操作原型，但尚未完成真实使用验证或发布 | 可以进入首页精选区，标注为“进行中的产品”或“交互原型”；案例聚焦设计决策，不暗示已发布 |
| 仍以想法、零散页面或未打通的流程为主 | 暂不放首页；待核心路径和视觉表达成熟后再公开 |

Waybox 目前更接近“较完整的设计方案、仍需核实原型与开发状态”这一档。推荐先做一张精炼的项目卡：一张最有说服力的设计界面、一句话说明目标用户与问题、个人职责，以及准确的当前状态。核心流程可演示、页面细节稳定后，再扩展为完整案例。

## 发布前检查

- 首屏在桌面和手机上都能直接看到定位与作品入口。
- 作品缩略图清晰，卡片文案能在几秒内读懂。
- 每篇案例的职责、项目状态和证据一致。
- 导航、链接、手机端布局和英文拼写逐一检查。
- 核实 Waybox 的最终界面、原型、本人职责、用户研究和开发状态，再确定首页排序与案例中可使用的成果表述。
