<h1 align="center">🏎️ WUTE 电车队官网</h1>

<p align="center"><b>WUTE Racing — 武汉理工大学电动方程式赛车队官方网站</b><br>
纯静态站点 · 无后端 · GitHub Actions 自动部署</p>

<p align="center">
  <a href="https://www.wute.club"><img src="https://img.shields.io/website?url=https%3A%2F%2Fwww.wute.club&label=www.wute.club&style=flat-square" alt="Website"></a>
  <a href="https://github.com/z10-01z/wute-club/actions/workflows/deploy.yml"><img src="https://github.com/z10-01z/wute-club/actions/workflows/deploy.yml/badge.svg" alt="Deploy"></a>
  <img src="https://img.shields.io/badge/%E7%BA%AF%E9%9D%99%E6%80%81-%E6%97%A0%E5%90%8E%E7%AB%AF-000000?style=flat-square" alt="Static">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat-square" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square" alt="JavaScript">
  <img src="https://img.shields.io/badge/WebP-4285F4?logo=webp&logoColor=white&style=flat-square" alt="WebP">
  <img src="https://img.shields.io/badge/a11y-WCAG_AA-2ea44f?style=flat-square" alt="Accessibility">
</p>

---

## 📌 项目简介

武汉理工大学 WUTE 电动方程式赛车队官方网站。车队成立于 2013 年，连续十四年征战中国大学生电动方程式大赛（FSEC），2024 赛季斩获全国季军，累计培养 600 余名青年工程师。

**WUTE Racing** is the official website of the Electric Formula Student Racing Team of Wuhan University of Technology (WUT). Founded in 2013, the team has competed in Formula Student China (FSC) for 14 consecutive years, won 3rd place nationally in 2024, and cultivated 600+ young engineers.

🌐 **在线访问**：<https://www.wute.club>

## ✨ 功能特性

- **22 个页面**：首页、车队历史、荣誉奖项、E03 赛车规格、队员风采、六大技术组别、赞助商合作、合作案例详情、相册、设计作品集及错误页
- **设计系统**：`assets/wute.css` 统一全站导航、字体、石墨色背景、容器、按钮与页脚；`assets/home.css` 仅定义首页布局
- **原生交互**：`assets/home.js` 负责首页轮播；`assets/wute.js` 负责全站导航、菜单、灯箱及回到顶部
- **交互细节**：轮播箭头与页码、灯箱（Esc 关闭 + ← → 切换）、移动端全屏菜单、图片懒加载、卡片图点击放大
- **无障碍**：相册照片可用键盘打开、灯箱关闭后恢复焦点、图片提供 alt 文本、键盘焦点可见，并尊重系统减少动态效果设置
- **性能优化**：字体子集化（42.8MB → 50KB）、图片压缩（406MB → 72MB）、**全站 WebP 化 + 按显示尺寸生成变体**（相册页 27.5MB → 6.0MB）、CLS 修复、SEO / 分享 meta（og:image 等）

## 🛠 技术栈

| 技术 | 说明 |
|---|---|
| 原生 HTML + CSS + JavaScript | 无框架、无构建流程、无后端 |
| `assets/home.css` | 首页首屏及章节布局，仅作用于首页 |
| `assets/home.js` | 首页轮播；保留自动播放与箭头，手动切换后停止自动轮播 |
| `assets/wute.css` | 共享设计系统（设计令牌 / 导航 / 页脚 / hero / 通用组件 / 工具类） |
| `assets/wute.js` | 共享交互（导航滚动 / 手机菜单 / 灯箱 / 彩蛋），零依赖 |
| GitHub Actions | push 即自动部署到服务器 |

## 📄 页面一览

| 页面 | 说明 |
|---|---|
| `index.html` | 首页（全屏轮播 / E03 技术展示 / 车队与组别 / 影像 / 合作伙伴 / 加入入口） |
| `about.html` | 车队历史（2013–2026 十四代赛车时间轴） |
| `honors.html` | 荣誉奖项（赛季成绩 + 技术里程碑） |
| `car.html` | E03 赛车技术规格 |
| `gallery.html` | 队员风采（相册入口） |
| `album-2025-赛场.html` / `album-2026-毕业季.html` | 2025 赛场 / 2026 毕业季相册（128 张照片） |
| `join.html` | 加入我们（六大组别 + 招新流程 + 常见问题） |
| `sponsors.html` | 赞助商合作（赞助回报 / 支持方式 / 赞助商墙） |
| `sponsors/case-*.html` | 合作案例详情（岚图汽车 / 中复神鹰 / 合源锂创） |
| `sponsors/rsc.html` | RSC 退役队员联合组织 |
| `groups/` | 电气 / 单体壳 / 空套 / 悬架 / 轮边 / 运营 六大组别 |
| `blog-红包封面.html` | 马年春节设计作品集 |

## 🎨 设计系统

共享设计令牌位于 `assets/wute.css` 的 `:root`。首页与内页共用这些规则，`assets/home.css` 仅处理首页独有布局：

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-deep` | `#0b0d10` | 页面主背景 |
| `--bg-surface` | `#15181d` | 石墨色章节与卡片 |
| `--brand-blue` | `#00489b` | 品牌标识 |
| `--brand-blue-text` | `#7db4ff` | 深色背景上的链接与焦点 |
| `--brand-red` | `#d0121b` | 品牌红 |
| `--text-primary` | `#f4f5f6` | 主文字与主按钮背景 |

统一组件：`.site-nav`（导航）、`.page-hero`（内页标题）、`.site-footer`（页脚）、`.card` / `.btn` / `.timeline` / `.spec-table` 等。

队标文件 `picture/WUTE_logo_white.png` 实际为蓝色原图；导航与页脚直接显示原色，不要添加反白滤镜。全站不使用蓝白红三色装饰短条。首页轮播大字使用现有的造字工房力黑与狂派手书字体文件，字体只有 400 字重，勿合成加粗；其余标题继续使用共享字阶。

## 📁 目录结构

```
www.wute.club/
├── index.html / about.html / honors.html / car.html ...   # 22 个页面
├── assets/
│   ├── wute.css          # 共享设计系统（改品牌色只改这里）
│   ├── home.css          # 首页视觉与响应式布局
│   ├── home.js           # 首页轮播
│   └── wute.js           # 共享交互
├── groups/               # 六大技术组别页
├── sponsors/             # 赞助商页（RSC + 3 个合作案例）
├── picture/              # 照片资源（首页 / 历史 / 相册；每张图附带同名 .webp 变体）
├── fonts/                # 子集化字体（woff2）
├── 赞助商/                # 赞助商 logo
└── 红包封面/              # 设计作品图
```

## 🚀 本地预览

```bash
cd www.wute.club
python -m http.server 8000
# 打开 http://localhost:8000
```

或直接双击 `index.html` 以 file:// 打开。

> 网站不依赖运行时 CDN，静态资源按页面的相对路径加载。

## 📦 部署

- 推送至 `main` 分支后，GitHub Actions 自动通过 SSH **rsync 增量同步**到服务器，约 1 分钟内上线
- 日常更新：`git add -A` → `git commit -m "说明"` → `git push`
- 服务器连接信息全部存放于 **GitHub Secrets**（`SERVER_*`），仓库内无任何明文凭据
- rsync 排除：`.git/` `.github/` `.gitignore` `README.md` `.well-known/`（SSL 验证）等

## 🧰 维护指南

- **改品牌色 / 导航 / 页脚 / Hero**：只改 `assets/wute.css`
- **改共享 CSS / JS**：同时更新各 HTML 中 `wute.css?v=...` / `wute.js?v=...` 的版本号，让浏览器立即获取新文件；服务器可能缓存旧 URL 7 天
- **新增页面**：沿用现有内页结构（nav / page-hero / content / footer + `wute.js`）
- **新增样式**：优先复用 `wute.css` 中的共享组件与设计令牌
- **更换字体**：字体子集化用 `字体子集化工具.py`（项目根目录，改了页面里的新汉字要重跑）
- **新增 / 更换图片**：正常写 `<img>` 即可；想让图片走 WebP 就运行 `生成webp图.py`（项目根目录）——
  它会按目录预设宽度生成 `.webp` 并自动把 `<img>` 包进 `<picture>`，**原图不动、删掉 webp 即可回滚**
- **压缩图片体积**：`图片压缩工具.py`（可选，WebP 化之后收益已经不大）

## 📝 版权声明

© 2026 WUTE Racing · 武汉理工大学电动方程式赛车队。网站代码可自由学习参考；网站内容、照片与设计作品版权归 WUTE 车队及相关作者所有，赞助商商标归各企业所有。
