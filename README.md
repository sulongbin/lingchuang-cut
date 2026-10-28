# lingchuang-cut

**把口播剪成有画面、有信息、有节奏的内容。**

lingchuang-cut 是面向 AI 编程智能体的中文视频剪辑技能包，适合知识口播、科技商业内容、案例拆解和操作教学。提供统一的制作流程、视觉规则、技术模块和交付检查，由支持技能的智能体执行；它不是独立剪辑软件，也不是安装后无需环境配置的一键成片工具。

## 能做什么

- 分析原片与口播内容，整理逐段剪辑方案。
- 安排真人、动态画中画、案例素材和信息动画。
- 制作关键词强调、流程推演、数据变化、镜头推近和分层转场。
- 按内容选择本地素材，必要时生成主题配图。
- 处理字幕、配乐与口播混音，生成融合本人照片的封面。
- 保留可编辑工程，检查画面、声音、时间轴并输出成片。

## 先确认类型，再开始制作

支持口播／案例拆解、Vlog、操作教程、产品宣传或其他风格的任务分流。未明确类型时先询问并等待确认；已经明确则直接执行。模板与动画在确认后选择，不凭素材外观擅自决定。当前升级为流程规则，新增 Vlog 路线尚未完成实片验证。

## 自定义本地素材库

首次使用时，助手会提醒你选择自己的素材库。可以发送文件夹完整路径，选择仅本次使用或保存为默认；也可以暂不设置，只使用本次提供的素材。保存后下次自动沿用，随时说“更换素材库”即可修改。目录不存在或无法读取时会重新提醒，不会自行搜索其他磁盘。

每位用户的路径只保存在本机 `local-config.json`，安装包不包含作者的个人素材路径，也不包含会员素材。该选择由技能引导宿主助手完成，不是独立图形设置面板。

## 口播路线默认风格

真人全屏约 30%，信息动画配真人画中画约 40%，素材主导画面约 30%。人物持续播放，原音贯穿；暗色背景、清晰排版和有目的的动画服务于内容。比例、字幕、配乐、横竖屏都可按单条视频调整。

## 安装

下载本仓库或发行包，将整个 `lingchuang-cut` 文件夹放到 `~/.codex/skills/lingchuang-cut`。Windows 通常为 `%USERPROFILE%\.codex\skills\lingchuang-cut`。文件夹内应直接包含 `SKILL.md`。

下一轮对话调用：

```text
使用 $lingchuang-cut 剪辑这个视频：[原片绝对路径]。
素材库：[素材目录]。按默认案例拆解风格制作，生成含本人照片的封面。
```

也可以这样说明：

```text
使用 $lingchuang-cut 保持横屏剪辑这条操作演示，优先看清界面。
本次不加背景音乐，保留原字幕，补充必要的流程示意。
```

## 环境与能力

需要宿主智能体的文件、命令执行能力，以及可用的视频编解码、渲染环境。转写、图像生成和部分高级动画还需要对应模型或服务。内部参考包不会自动安装底层软件，也不保证所有机器立即能渲染。

`python scripts/modules.py list` 查看内部模块；智能体按需展开技术资料，不必全部加载。具体环境与技术依赖见 [实现说明](references/implementation.md)，第三方来源与许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 输出

每个项目建议包含 `output/` 成片与封面、`project/` 可编辑工程、`assets/` 使用的素材和 `review/` 分镜及检查记录。原片保持不变，修改版独立命名。

## 许可与状态

本项目原创编排、说明和辅助脚本采用 MIT 许可；内部第三方资料遵循各自许可，底层软件许可单独适用。

首版完成结构、引用、模块展开与封装检查。它整合了既有剪辑工作方法；整合包本身尚未完成新视频的端到端渲染验收，不宣称全部模块已通过实片测试。

## 开放模板扩展（本地版 v1.2.0）

内置科技风开放内容包 0.2.29-open-beta，不含个人账户 Key。运行 `python scripts/templates.py list` 查看，`python scripts/templates.py unpack kinetic-tech` 展开。受保护模板不下载、不引用。详见 [开放模板](references/open-templates.md)。

已验证压缩包完整性、账户凭据排除和无 Key 本地 capabilities／doctor 入口。完整渲染尚未验证；本机检查仍缺独立 Python 3.13 依赖环境及可发现的 ffprobe。

## WorkBuddy 和 Codex 安装

Windows 的 WorkBuddy：

```powershell
npx.cmd --yes --package=github:sulongbin/lingchuang-cut lingchuang-cut-install --app workbuddy
```

Codex：`npx.cmd --yes --package=github:sulongbin/lingchuang-cut lingchuang-cut-install --app codex`。需要 Node.js 18 或更高版本（建议使用仍受支持的 LTS 版本）、npm、Git 以及可访问 GitHub 的网络；安装器只安装技能文件，不自动安装剪辑工具。WorkBuddy 安装到 `%USERPROFILE%\.workbuddy\skills\lingchuang-cut`。若目录已存在，安装器不会覆盖；将原目录备份到 skills 目录之外，再安装，并恢复自己的 `local-config.json`。安装后重启应用或新建对话检查识别，并选择本地素材库。

### 发给会员的安装提示词

```text
请帮我安装 lingchuang-cut（灵创智影 AI 剪辑）技能。
仓库：https://github.com/sulongbin/lingchuang-cut
先阅读安装说明，检查本机 Node.js、npm 和 Git，再执行适用于 Windows WorkBuddy 的命令：
npx.cmd --yes --package=github:sulongbin/lingchuang-cut lingchuang-cut-install --app workbuddy
如果已有旧版，先备份到技能目录之外，保留个人 local-config.json，再安装新版并恢复个人配置。
如果网络下载失败，明确报告原因，可改用我提供的新版 ZIP；不要把失败报告成安装成功。
完成后检查 SKILL.md、references、bundles 和 assets 是否齐全，并在 WorkBuddy 中确认技能可识别。
提醒我选择自己的本地素材库；先确认剪辑类型与风格，再开始制作。
本次只安装和检查，不开始剪辑，不提交付费生成任务，不要求我把 API Key 发到聊天中。
```

### ZIP 备用安装

下载 [v1.3.1 完整 ZIP](https://github.com/sulongbin/lingchuang-cut/raw/refs/heads/main/lingchuang-cut-v1.3.1.zip)，将其中的 `lingchuang-cut` 文件夹放到 `%USERPROFILE%\.workbuddy\skills\`，确保 `SKILL.md` 直接位于 `lingchuang-cut` 内。已有版本先按上述步骤备份和恢复个人配置。仓库保留的 `v1.0.0`、`v1.2.1` ZIP 是历史快照，不含本次更新。

安装成功与成功剪出视频是两个验收阶段。渲染工具、转写及图像生成服务需按实际项目检查；会员的网络和 WorkBuddy 识别结果也须在其电脑上确认。

v1.3.1 安装验收：从实际 npm 安装包在隔离目录安装到 WorkBuddy、Codex 均通过；逐文件与源文件一致，5 个模块及开放模板校验和通过，重复安装会拒绝覆盖并保留个人配置。仓库内运行 `npm test` 可复查。此次 GitHub 在线下载测试超时，未将其或 WorkBuddy 界面识别记为已通过。

## 素材动效升级

优先在真实口播、产品照片和操作录屏上制作合适的运动、轮廓光、空间层次和转场；保留画面可读和音画同步。缺少素材时可按内容生成并标记示意。3D 工具和图像生成需要环境支持，先做短预览；具体能力与测试限制见 [视觉规则](references/visual.md)。按每位用户要求决定是否配乐。
