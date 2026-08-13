# WUTE 电车队官网

武汉理工大学 WUTE 电动方程式赛车队官方网站（纯静态站点）。

## 技术栈

- 原生 HTML + CSS + JavaScript，无后端、无构建流程
- GSAP + ScrollTrigger（CDN）用于滚动动画
- 共享设计系统 `assets/wute.css`（设计令牌/导航/页脚/hero/通用组件）+ `assets/wute.js`（导航滚动/汉堡菜单/滚动显现动画），全站 17 个页面统一接入
- 首页 Tailwind 工具类已静态提取为本地 CSS（不依赖 CDN 运行时编译）

## 目录结构

| 路径 | 说明 |
|---|---|
| `index.html` | 首页（轮播/悬浮目录等页面专属 CSS/JS 内联，共享部分引用 wute.css） |
| `about.html` | 车队历史 |
| `gallery.html` | 队员风采（相册入口） |
| `honors.html` | 荣誉奖项（奖项 + 技术里程碑时间轴） |
| `car.html` | E03 赛车技术规格 |
| `join.html` | 加入我们（招新流程 + 报名方式） |
| `sponsors.html` | 赞助商合作（合作方式 + 赞助商墙） |
| `album-2025-赛场.html` / `album-2026-毕业季.html` | 相册页 |
| `blog-红包封面.html` | 设计作品展示 |
| `groups/` | 六大技术组别介绍页 |
| `sponsors/rsc.html` | RSC 赞助商介绍页 |
| `assets/wute.css` / `assets/wute.js` | **共享设计系统与交互（改品牌色只改 wute.css 的 :root）** |
| `picture/` | 照片资源（首页、历史、相册） |
| `fonts/` | 首页标题等字体文件 |
| `红包封面/`、`赞助商/` | 设计图、赞助商 logo |

## 部署

- 代码推送至本仓库 `main` 分支后，GitHub Actions 自动通过 SSH 增量同步到服务器。
- 日常更新流程：改文件 → `git add -A` → `git commit -m "改动说明"` → `git push`，约 1 分钟内网站自动更新。
- 服务器连接信息存放于 GitHub Secrets（`SERVER_*`），不在代码仓库明文出现。

## 维护提示

- **改品牌色 / 导航 / 页脚 / hero**：只改 `assets/wute.css`，全站生效
- **新增页面**：照抄现有二级页模板（nav/page-hero/content/footer + GSAP + wute.js）
- **新增 Tailwind 类**：需手动在 `assets/wute.css` 工具类节补 CSS 规则
- **待办**：招新 QQ 群号、荣誉奖项明细、E03 详细参数（页面内有 TODO 注释）
