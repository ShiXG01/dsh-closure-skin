# dsh-closure-skin

《明日方舟》可露希尔主题的 DeepSeek Harness（DSH）客户端皮肤。

## 功能

- 深 / 浅色 CRT 配色、扫描线、半透明场景层
- 像素图标：插件、自动化任务、更多、刷新、加载、文件夹、置顶、归档
- 字体方案：Cascadia Mono + DengXian（默认）、Fusion Pixel、系统默认
- 设置 → 可露希尔：字体方案、中文字体、扫描线

## 结构

- `src/client.template.js` — 浏览器半边模板；素材先写成占位符，构建时注入 data URI
- `tools/build-client.mjs` — 生成 `lib/client.js`
- `lib/index.js` — Host 半边，提供 `/dsh-closure-skin/fonts/*` 字体路由
- `lib/fonts/` — Fusion Pixel 12px（SIL OFL 1.1）
- `src/icons/` — 图标素材
- `cordis.patch.yml`、`package.json` — DSH bundle 入口

## 构建

```sh
node tools/build-client.mjs
```

改 `src/client.template.js` 或 `src/icons/` 后必须重新构建；不要手改 `lib/client.js`。

## 安装

profile 的 `package.json` 增加：

```json
"dsh-closure-skin": "link:E:/path/to/dsh-closure-skin"
```

并把 `dsh-closure-skin` 加入 `dsh.profile.bundles`；或在 Plugins → Add plugin 里填本地目录。

## 字体

- 默认英文：Cascadia Mono（系统字体）
- 默认中文：DengXian / 等线（系统字体）
- 顶栏 caption 字标：Orbitron Black（OFL），`lib/fonts/orbitron-900.woff2`
- 可选像素字体：Fusion Pixel 12px，作者 TakWolf，SIL OFL 1.1，详见 `FONT-NOTICE.md` 与 `LICENSE-FONT`

## 注意

- 设置页通过 `settings.section` 注册；首装或更新 Host 半边（字体路由）后重启一次 DSH。
- `lib/` 是提交型构建产物；发布/复制时连同 `lib/fonts/` 一起保留。
