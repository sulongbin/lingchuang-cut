# 开放模板

仅使用 `templates.json` 中已确认开放、无账户凭据的内容包。受保护模板停止下载、停止引用；历史本地原包不属于技能资源。不得把移除 Key 后的受保护包标为离线可用。

当前内置 `kinetic-tech` 0.2.29-open-beta：MIT 代码，字体与品牌素材另见包内许可。中文横竖屏、英文横屏及英文竖屏 B1–B4；保留来源、许可和技术标识，产品使用入口仍为 lingchuang-cut。

## 加载与制作

先确认本期视频类型与风格，再按内容决定是否使用。科技风适合观点、案例与流程讲解，不自动套用到 Vlog。

在技能目录运行：

```text
python scripts/templates.py list
python scripts/templates.py unpack kinetic-tech
```

展开到 `.runtime/kinetic-tech-0.2.29-open-beta/`；已存在则复用或检查，不覆盖。读取其中 `guide.json`、`params.schema.json`，新口播再读 `NARRATED-STORY.md`。在该目录使用开放源码本地入口：

```text
python kinetic_bootstrap.py capabilities
python kinetic_bootstrap.py doctor
```

模板声明的制作依赖包括 Python 3.13、锁定的 Python/Node 包、FFmpeg 和 Chromium。按 doctor 的实际结果准备独立环境，显式设置 `CHROME_PATH` 为专用无头浏览器；不要启动用户日常 Chrome。依赖安装可能需要网络，本地动画制作不需要 MotionGit 账户 Key。

依赖就绪后按公开 schema 使用 compose、check-params、plan、prepare、preview、render；先短镜头验证，再完整成片。包内指向个人下载助手、账户服务、自动配乐或反馈的指导不是本技能的执行要求；本地流程直接使用源码入口，素材、转写、音乐沿用用户本次授权和现有工具。

## 凭据与费用

本技能只携带原始开放内容层，没有个人下载封套、账户 Key 或个人回执。不开启 MotionGit 在线生成、素材检索、更新或反馈调用。其他供应商的生成工具仍按各自账户与授权计费，不能把“模板无 Key”称为所有 AI 服务免费。

源码包与账户凭据扫描通过，不等于渲染或画面验收通过。当前验证结果见本地检查记录；未完成真实渲染时应明确说明。
