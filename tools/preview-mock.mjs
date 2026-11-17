// 从生成的 lib/client.js 抽 CSS + 内联素材，套一个模拟 DSH 界面渲染预览图（深/浅 + 情绪态）。
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire('E:/project/tools/spinecheck/')
const { chromium } = require('playwright-core')

const CLIENT = 'E:/project/closure-pet/plugin/dsh-closure-skin/lib/client.js'
const OUT = 'E:/project/closure-pet/preview/harness'
const src = fs.readFileSync(CLIENT, 'utf8')

const start = src.indexOf('const CSS = `')
const end = src.indexOf('`\n\n    function BrandMark')
if (start < 0 || end < 0) throw new Error('CSS block not found')
const css = src.slice(start + 'const CSS = `'.length, end)

const logoMatch = src.match(/const LOGO = '(data:image\/png;base64,[^']+)'/)
const logo = logoMatch ? logoMatch[1] : ''

function shell(theme, mood) {
  return `<!doctype html><html data-dsh-closure-skin data-dsh-closure-theme="${theme}" data-dsh-closure-mood="${mood}">
<head><meta charset="utf-8">
<style>
  :root { color-scheme: ${theme}; }
  html,body{margin:0;height:100%}
  body{ display:flex; color: ${theme === 'dark' ? '#e8e8f5' : '#172347'}; }
  .side{width:236px;flex:0 0 236px;background:var(--dsw-specific-sidebar-fill);border-right:1px solid var(--dsw-alias-border-l1);padding:12px;box-sizing:border-box}
  .brand{display:flex;align-items:center;gap:8px;margin-bottom:18px}
  .row{height:26px;border-radius:6px;background:var(--dsw-alias-bg-layer-1);margin:6px 0;opacity:.85}
  .main{flex:1;display:flex;flex-direction:column;padding:16px;box-sizing:border-box}
  .bubble{max-width:70%;padding:10px 12px;border-radius:10px;background:var(--dsw-alias-bg-layer-1);margin:6px 0;font-size:13px;line-height:1.6}
  .bubble.me{align-self:flex-end;background:var(--dsw-alias-bg-layer-2)}
  .composer{margin-top:auto;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:10px 12px;font-size:13px;opacity:.9}
  ${css}
</style></head>
<body>
  <div class="side">
    <div class="brand"><span class="cl-brand"><img src="${logo}" alt=""></span><span class="cl-name">CLOSURE HARNESS</span></div>
    <div class="row"></div><div class="row"></div><div class="row"></div><div class="row"></div>
  </div>
  <div class="main">
    <div class="bubble">作战结束——今天的余额还剩多少？</div>
    <div class="bubble me">看一下吧。</div>
    <div class="bubble">（可露希尔抬头，CRT 屏幕亮起）</div>
    <div class="composer">输入消息…<div class="cl-rail" style="margin-top:8px"></div></div>
  </div>
  <div class="cl-frame"></div>
  <div class="cl-topbar">
    <span class="tb-title">CLSR-TOKEN-Burner</span>
    <span class="tb-btns"><span class="tb-btn"></span><span class="tb-btn max"></span><span class="tb-btn close"></span></span>
  </div>
</body></html>`
}

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1180, height: 720 }, deviceScaleFactor: 1 })
fs.mkdirSync(OUT, { recursive: true })
for (const [theme, mood] of [['dark', 'normal'], ['light', 'normal'], ['dark', 'peak']]) {
  await page.setContent(shell(theme, mood), { waitUntil: 'load' })
  await page.waitForTimeout(250)
  const file = path.join(OUT, `mock-${theme}-${mood}.png`)
  await page.screenshot({ path: file })
  console.log('wrote', file)
}
await browser.close()
