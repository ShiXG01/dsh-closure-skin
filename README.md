# dsh-closure-skin

《明日方舟》可露希尔主题的 DeepSeek Harness（DSH）客户端皮肤。

## 功能

- 深 / 浅色 CRT 配色、扫描线、半透明场景层
- 像素图标：插件、自动化任务、更多、刷新、加载、文件夹、置顶、归档
- 字体方案：Cascadia Mono + DengXian（默认）、Fusion Pixel、系统默认
- 设置 → 可露希尔主题：字体方案、中文字体、扫描线、自定义背景、左侧边栏透明度和模糊度

## 自定义背景

打开 **设置 → 可露希尔主题 → 自定义背景**，选择一张本地图片（PNG、JPG、WebP、GIF、AVIF）或一个本地视频（MP4、WebM）。文件上限为 100 MB，视频静音循环播放；系统开启「减少动态效果」时，视频仅显示静帧。

壁纸居中显示，可选择**填充、适应或拉伸**，也可实时调节壁纸不透明度和模糊度。不透明度默认为 40%，保留皮肤原有的底色和 CRT 装饰。点击 **恢复默认背景**可删除已保存的壁纸，恢复原有场景。

壁纸和设置保存在当前浏览器的站点数据中，刷新后会恢复；不会上传给 DSH 宿主，也不会跨浏览器、设备或访问地址同步。若同时开启其他壁纸插件，建议关闭其中一方的壁纸功能。

## 左侧边栏

左栏底板使用右栏「开始」页同款渐变，但不叠加开始页的扫描线纹理。打开 **设置 → 可露希尔主题 → 左侧边栏**，可调节渐变的不透明度（0% 完全透出壁纸，100% 显示不透明渐变）和背景模糊（0–30 px）。两个滑块实时生效，不会淡化或模糊文字和图标。点击 **恢复左栏默认** 可还原主题默认的不透明度和模糊度。

自定义背景和左栏调节参考 [dsh-any-background](https://github.com/Tkingxiao/dsh-any-background)，无需安装它。

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

### 从仓库安装（推荐）

在 Plugins → Add plugin 里填仓库地址：

```
https://github.com/fengshiyangrouguan/dsh-closure-skin
```

或手动在 profile 的 `package.json` 加依赖，并把插件名加进 `dsh.profile.bundles`：

```json
"dsh-closure-skin": "github:fengshiyangrouguan/dsh-closure-skin"
```

### 本地开发安装

```json
"dsh-closure-skin": "link:<本地路径>/dsh-closure-skin"
```

同样需要把 `dsh-closure-skin` 放进 `dsh.profile.bundles`。

## 字体

- 默认英文：Cascadia Mono（系统字体）
- 默认中文：DengXian / 等线（系统字体）
- 顶栏 caption 字标：Orbitron Black（OFL），`lib/fonts/orbitron-900.woff2`
- 可选像素字体：Fusion Pixel 12px，作者 TakWolf，SIL OFL 1.1，详见 `FONT-NOTICE.md` 与 `LICENSE-FONT`

## 注意

- 设置页通过 `settings.section` 注册；首装或更新 Host 半边（字体路由）后重启一次 DSH。
- `lib/` 是提交型构建产物；发布/复制时连同 `lib/fonts/` 一起保留。
