import * as THREE from 'three'
import type { Flavor } from '../content'
import { brand } from '../brand'

const W = 2048
const H = 1024

// Cylinder UVs start at +Z, so the label "front" is drawn at u = 0.5 and the
// can is rotated by PI in the scene to face the camera.
export function makeLabel(flavor: Flavor): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const g = c.getContext('2d')!

  // base
  const base = g.createLinearGradient(0, 0, 0, H)
  base.addColorStop(0, shade(flavor.label, 0.25))
  base.addColorStop(0.5, flavor.label)
  base.addColorStop(1, shade(flavor.label, -0.45))
  g.fillStyle = base
  g.fillRect(0, 0, W, H)

  // diagonal speed stripes
  g.save()
  g.globalAlpha = 0.09
  g.fillStyle = flavor.accent
  for (let x = -H; x < W + H; x += 90) {
    g.beginPath()
    g.moveTo(x, H)
    g.lineTo(x + 34, H)
    g.lineTo(x + 34 + H * 0.6, 0)
    g.lineTo(x + H * 0.6, 0)
    g.fill()
  }
  g.restore()

  // dill frond silhouettes wrapping the can
  g.save()
  g.strokeStyle = shade(flavor.label, -0.35)
  g.globalAlpha = 0.55
  g.lineWidth = 5
  for (let i = 0; i < 9; i++) frond(g, (i / 9) * W + 60, H * 0.82, 220 + (i % 3) * 50, -Math.PI / 2 + (i % 2 ? 0.25 : -0.25))
  g.restore()

  // top + bottom bands
  g.fillStyle = '#0b1a0f'
  g.fillRect(0, 0, W, 70)
  g.fillRect(0, H - 90, W, 90)
  g.fillStyle = flavor.accent
  g.fillRect(0, 70, W, 8)
  g.fillRect(0, H - 98, W, 8)

  g.font = '500 30px "Space Grotesk", sans-serif'
  g.textBaseline = 'middle'
  g.fillStyle = flavor.accent
  const band = 'PICKLE-POWERED ENERGY  ⚡  REAL DILL BRINE  ⚡  180MG CAFFEINE  ⚡  '
  tile(g, band, 36)
  g.fillStyle = '#f3efe0'
  g.font = '500 28px "Space Grotesk", sans-serif'
  tileAt(g, '16 FL OZ · 473 mL · STAY SALTY · ', H - 45)

  const cx = W / 2

  // glow behind the logo
  const halo = g.createRadialGradient(cx, H * 0.47, 10, cx, H * 0.47, 520)
  halo.addColorStop(0, hexA(flavor.accent, 0.55))
  halo.addColorStop(1, hexA(flavor.accent, 0))
  g.fillStyle = halo
  g.fillRect(cx - 600, 80, 1200, H - 180)

  // logo: the Stitch artwork if it's been dropped in, otherwise the wordmark
  if (brand.logo) {
    const img = brand.logo
    const h = 470
    const w = (img.width / img.height) * h
    g.save()
    g.shadowColor = 'rgba(0,0,0,.45)'
    g.shadowBlur = 30
    g.drawImage(img, cx - w / 2, H * 0.47 - h * 0.62, w, h)
    g.restore()
  } else {
    g.textAlign = 'center'
    g.font = '400 300px Anton, Impact, sans-serif'
    g.lineJoin = 'round'
    g.lineWidth = 26
    g.strokeStyle = '#0b1a0f'
    g.strokeText("DILL'D", cx, H * 0.47)
    g.fillStyle = '#f3efe0'
    g.fillText("DILL'D", cx, H * 0.47)

    g.save()
    g.translate(cx + 340, H * 0.2)
    g.scale(4.2, 4.2)
    g.fillStyle = flavor.accent
    g.strokeStyle = '#0b1a0f'
    g.lineWidth = 3
    bolt(g)
    g.restore()
  }

  g.textAlign = 'center'
  // flavor pill
  g.font = '400 64px Anton, Impact, sans-serif'
  const label = flavor.name.toUpperCase()
  const tw = g.measureText(label).width + 80
  g.fillStyle = '#0b1a0f'
  roundRect(g, cx - tw / 2, H * 0.66, tw, 96, 48)
  g.fill()
  g.fillStyle = flavor.accent
  g.fillText(label, cx, H * 0.66 + 52)

  g.font = '500 30px "Space Grotesk", sans-serif'
  g.fillStyle = '#f3efe0'
  g.fillText('BRINE ENERGY DRINK', cx, H * 0.79)

  // side bolts
  for (const x of [W * 0.17, W * 0.83]) {
    g.save()
    g.translate(x - 60, H * 0.3)
    g.scale(8, 8)
    g.globalAlpha = 0.9
    g.fillStyle = flavor.accent
    g.strokeStyle = '#0b1a0f'
    g.lineWidth = 1.5
    bolt(g)
    g.restore()
  }

  // back panel: faux nutrition facts (wraps across the seam)
  for (const ox of [-W + 40, 40]) nutrition(g, W - 260 + ox, 150)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function nutrition(g: CanvasRenderingContext2D, x: number, y: number) {
  g.save()
  g.textAlign = 'left'
  g.fillStyle = 'rgba(11,26,15,.82)'
  roundRect(g, x, y, 440, 600, 20)
  g.fill()
  g.fillStyle = '#f3efe0'
  g.font = '400 54px Anton, Impact, sans-serif'
  g.fillText('BRINE FACTS', x + 30, y + 60)
  g.font = '500 26px "Space Grotesk", sans-serif'
  const rows = [
    ['Calories', '10'],
    ['Sugar', '0g'],
    ['Sodium', '480mg'],
    ['Potassium', '220mg'],
    ['Caffeine', '150mg'],
    ['Dill', 'a lot'],
    ['Chill', 'none'],
  ]
  rows.forEach(([k, v], i) => {
    const ry = y + 130 + i * 62
    g.fillRect(x + 30, ry - 34, 380, 2)
    g.fillText(k, x + 30, ry)
    g.textAlign = 'right'
    g.fillText(v, x + 410, ry)
    g.textAlign = 'left'
  })
  g.restore()
}

function bolt(g: CanvasRenderingContext2D) {
  g.beginPath()
  g.moveTo(20, 0)
  g.lineTo(2, 26)
  g.lineTo(13, 26)
  g.lineTo(8, 46)
  g.lineTo(28, 17)
  g.lineTo(17, 17)
  g.closePath()
  g.fill()
  g.stroke()
}

function frond(g: CanvasRenderingContext2D, x: number, y: number, len: number, angle: number) {
  const dx = Math.cos(angle)
  const dy = Math.sin(angle)
  g.beginPath()
  g.moveTo(x, y)
  g.lineTo(x + dx * len, y + dy * len)
  for (let t = 0.15; t < 1; t += 0.09) {
    const px = x + dx * len * t
    const py = y + dy * len * t
    const l = 70 * (1 - t) + 18
    for (const s of [-1, 1]) {
      const a = angle + s * 0.9
      g.moveTo(px, py)
      g.quadraticCurveTo(px + Math.cos(a) * l * 0.6, py + Math.sin(a) * l * 0.6, px + Math.cos(a - s * 0.4) * l, py + Math.sin(a - s * 0.4) * l)
    }
  }
  g.stroke()
}

function tile(g: CanvasRenderingContext2D, text: string, y: number) {
  tileAt(g, text, y)
}

function tileAt(g: CanvasRenderingContext2D, text: string, y: number) {
  g.textAlign = 'left'
  const w = g.measureText(text).width
  for (let x = 0; x < W; x += w) g.fillText(text, x, y)
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath()
  g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r)
  g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r)
  g.arcTo(x, y, x + w, y, r)
  g.closePath()
}

function shade(hex: string, amt: number) {
  const c = new THREE.Color(hex)
  if (amt > 0) c.lerp(new THREE.Color('#ffffff'), amt)
  else c.lerp(new THREE.Color('#000000'), -amt)
  return '#' + c.getHexString()
}

function hexA(hex: string, a: number) {
  const c = new THREE.Color(hex)
  return `rgba(${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0},${a})`
}
