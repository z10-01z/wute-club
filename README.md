# WUTE 电车队官网

武汉理工大学 WUTE 电动方程式赛车队官方网站（纯静态站点）。

## 技术栈

- 原生 HTML + CSS + JavaScript，无后端、无构建流程
- GSAP + ScrollTrigger（CDN）用于滚动动画
- 首页 Tailwind 工具类已静态提取为本地 CSS（不依赖 CDN 运行时编译）

## 目录结构

| 路径 | 说明 |
|---|---|
| `index.html` | 首页（单文件内联全部 CSS/JS） |
| `about.html` | 车队历史 |
| `gallery.html` | 队员风采（相册入口） |
| `album-2025-赛场.html` / `album-2026-毕业季.html` | 相册页 |
| `blog-红包封面.html` | 设计作品展示 |
| `groups/` | 六大技术组别介绍页 |
| `sponsors/rsc.html` | RSC 赞助商介绍页 |
| `picture/` | 照片资源（首页、历史、相册） |
| `字体/` | 首页标题等字体文件 |
| `红包封面/`、`赞助商/` | 设计图、赞助商 logo |

## 部署

- 代码推送至本仓库 `main` 分支后，GitHub Actions 自动通过 SSH 增量同步到服务器。
- 日常更新流程：改文件 → `git add -A` → `git commit -m "改动说明"` → `git push`，约 1 分钟内网站自动更新。
- 服务器连接信息存放于 GitHub Secrets（`SERVER_*`），不在代码仓库明文出现。
