// dsh-closure-skin — 宿主侧：只提供本皮肤的字体静态资源。
//
// 字体文件放在 lib/fonts/ 下，由 webServer 的 /dsh-closure-skin/fonts 前缀路由
// 以 immutable 缓存发给页面；表现层仍然完全在 client.js 里。
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PREFIX = '/dsh-closure-skin/fonts'
const FONT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'fonts')

// 白名单：只发这两个文件，避免路径拼接把包目录暴露出去。
const FONTS = new Map([
  ['proportional.woff2', 'font/woff2'],
  ['monospaced.woff2', 'font/woff2'],
  ['orbitron-900.woff2', 'font/woff2'],
])

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.statusCode = status
  res.setHeader('Content-Type', type)
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(body)
}

async function serveFont(req, res) {
  const method = req.method || 'GET'
  if (method !== 'GET' && method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    send(res, 405, 'method not allowed')
    return
  }

  let name
  try {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    name = decodeURIComponent(pathname.slice(PREFIX.length)).replace(/^\/+/, '')
  } catch (err) {
    send(res, 400, 'bad path')
    return
  }

  const type = FONTS.get(name)
  if (type === undefined) {
    send(res, 404, 'not found')
    return
  }

  let bytes
  try {
    bytes = await fs.readFile(path.join(FONT_DIR, name))
  } catch (err) {
    send(res, 500, 'font unavailable')
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', type)
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(method === 'HEAD' ? undefined : bytes)
}

export default {
  name: 'dsh-closure-skin',
  apply(ctx) {
    // webServer 由宿主提供；与桌宠一样，等 service 就绪后再注册。
    ctx.inject(['webServer'], (injected) => {
      injected.effect(() => injected.webServer.register({
        kind: 'prefix',
        path: PREFIX,
        handler: serveFont,
      }))
    })
  },
}
