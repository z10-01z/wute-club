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
  <img src="https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white&style=flat-square" alt="GSAP">
</p>

---

## 📌 项目简介

武汉理工大学 WUTE 电动方程式赛车队官方网站。车队成立于 2013 年，连续十四年征战中国大学生电动方程式大赛（FSEC），2024 赛季斩获全国季军，累计培养 600 余名青年工程师。

**WUTE Racing** is the official website of the Electric Formula Student Racing Team of Wuhan University of Technology (WUT). Founded in 2013, the team has competed in Formula Student China (FSC) for 14 consecutive years, won 3rd place nationally in 2024, and cultivated 600+ young engineers.

🌐 **在线访问**：<https://www.wute.club>

## ✨ 功能特性

- **20 个页面**：首页、车队历史、荣誉奖项、E03 赛车规格、队员风采、六大技术组别、赞助商合作、合作案例详情、相册、设计作品集等
- **全站统一设计系统**：`assets/wute.css` 提供设计令牌（AMG 纯黑 + 品牌蓝 `#00489b` + 品牌红 `#d0121b`）、导航、页脚、Hero、卡片、按钮等组件——改品牌色只改一个文件
- **GSAP 滚动动画**：滚动显现、视差、计数器、赞助商跑马灯、全屏轮播（Ken Burns 效果）
- **交互细节**：悬浮目录、灯箱（支持 Esc 关闭）、移动端全屏菜单、图片懒加载
- **性能优化**：字体子集化（42.8MB → 50KB）、图片批量压缩（406MB → 72MB）、CLS 修复、SEO / 分享 meta（og:image 等）

## 🛠 技术栈

| 技术 | 说明 |
|---|---|
| 原生 HTML + CSS + JavaScript | 无框架、无构建流程、无后端 |
| [GSAP](https://gsap.com/) + ScrollTrigger | CDN 引入，滚动动画 |
| `assets/wute.css` | 共享设计系统（设计令牌 / 导航 / 页脚 / hero / 通用组件） |
| `assets/wute.js` | 共享交互（导航滚动 / 汉堡菜单 / 滚动显现） |
| GitHub Actions | push 即自动部署到服务器 |

## 📄 页面一览

| 页面 | 说明 |
|---|---|
| `index.html` | 首页（轮播 / 赛事简介 / 车队简介 / 技术组别 / E03 赛车 / 赞助商墙 / 联系我们） |
| `about.html` | 车队历史（2013–2026 十四代赛车时间轴） |
| `honors.html` | 荣誉奖项（赛季成绩 + 技术里程碑） |
| `car.html` | E03 赛车技术规格 |
| `gallery.html` | 队员风采（相册入口） |
| `album-2025-赛场.html` / `album-2026-毕业季.html` | 2025 赛场 / 2026 毕业季相册（128 张照片） |
| `join.html` | 加入我们（六大组别 + 招新流程） |
| `sponsors.html` | 赞助商合作（赞助回报 / 支持方式 / 赞助商墙） |
| `sponsors/case-*.html` | 合作案例详情（岚图汽车 / 中复神鹰 / 合源锂创） |
| `sponsors/rsc.html` | RSC 退役队员联合组织 |
| `groups/` | 电气 / 单体壳 / 空套 / 悬架 / 轮边 / 运营 六大组别 |
| `blog-红包封面.html` | 马年春节设计作品集 |

## 🎨 设计系统

全站以 `assets/wute.css` 的 `:root` 为唯一事实来源：

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-deep` | `#000000` | 页面主背景 |
| `--brand-blue` | `#00489b` | 品牌蓝（强调色） |
| `--brand-red` | `#d0121b` | 品牌红 |
| `--text-primary` | `#f0f0f2` | 主文字 |

统一组件：`.site-nav`（导航）、`.page-hero`（二级页 Hero，含描边水印字）、`.site-footer`（页脚）、`.card` / `.btn` / `.timeline` / `.spec-table` 等。

## 📁 目录结构

```
www.wute.club/
├── index.html / about.html / honors.html / car.html ...   # 20 个页面
├── assets/
│   ├── wute.css          # 共享设计系统（改品牌色只改这里）
│   └── wute.js           # 共享交互
├── groups/               # 六大技术组别页
├── sponsors/             # 赞助商页（RSC + 3 个合作案例）
├── picture/              # 照片资源（首页 / 历史 / 相册）
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

或直接双击 `index.html` 以 file:// 打开（GSAP 走 CDN，需联网）。

## 📦 部署

- 推送至 `main` 分支后，GitHub Actions 自动通过 SSH **rsync 增量同步**到服务器，约 1 分钟内上线
- 日常更新：`git add -A` → `git commit -m "说明"` → `git push`
- 服务器连接信息全部存放于 **GitHub Secrets**（`SERVER_*`），仓库内无任何明文凭据
- rsync 排除：`.git/` `.github/` `.gitignore` `README.md` `.well-known/`（SSL 验证）等

## 🧰 维护指南

- **改品牌色 / 导航 / 页脚 / Hero**：只改 `assets/wute.css`
- **新增页面**：照抄现有二级页模板（nav / page-hero / content / footer + GSAP + `wute.js`）
- **新增 Tailwind 类**：需手动在 `wute.css` 工具类节补 CSS 规则
- **更换字体/图片**：字体子集化用 `字体子集化工具.py`，图片压缩用 `图片压缩工具.py`（项目根目录）

## 📝 版权声明

© 2026 WUTE Racing · 武汉理工大学电动方程式赛车队。网站代码可自由学习参考；网站内容、照片与设计作品版权归 WUTE 车队及相关作者所有，赞助商商标归各企业所有。
