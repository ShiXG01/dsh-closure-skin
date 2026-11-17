# 字体说明

本皮肤通过 `lib/fonts/` 附带以下字体：

## Fusion Pixel 12px（正文 / 代码）

- `proportional.woff2` — Fusion Pixel 12px Proportional SC（UI 正文）
- `monospaced.woff2` — Fusion Pixel 12px Monospaced SC（代码、终端等等宽场景）
- 作者：TakWolf（https://takwolf.com）
- 上游：https://github.com/TakWolf/fusion-pixel-font
- 打包来源：Fontsource `@fontsource/fusion-pixel-12px-proportional-sc` / `@fontsource/fusion-pixel-12px-monospaced-sc` 5.3.0
- 许可证：SIL Open Font License 1.1（全文见 `LICENSE-FONT`）

## Orbitron 900（顶栏 caption 字标）

- `orbitron-900.woff2` — Orbitron Black，latin 子集
- 作者：Matt McInerney（The League of Moveable Type）
- Copyright 2018 The Orbitron Project Authors (https://github.com/theleagueof/orbitron)
- 上游：https://github.com/theleagueof/orbitron
- 打包来源：Fontsource `@fontsource/orbitron` 5.3.0（`orbitron-latin-900-normal.woff2`）
- 许可证：SIL Open Font License 1.1（全文见 `LICENSE-FONT`）
- 用途：仅用于顶栏居中的 `CLSR-TOKEN-BURNER` 字标；不参与正文。

字体仅由本皮肤的 `lib/index.js` 通过 `/dsh-closure-skin/fonts/*` 静态路由同源提供，不依赖外部 CDN。若移除本皮肤，字体路由随插件一起释放。
