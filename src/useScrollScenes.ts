import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { flavors } from './content'
import { can, scroll } from './store'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const PI = Math.PI
const clamp01 = gsap.utils.clamp(0, 1)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
// 0..1 over [a, b]
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
// triangle pulse centered on c
const pulse = (p: number, c: number, w: number) => Math.max(0, 1 - Math.abs(p - c) / w)
const ease = gsap.parseEase('power2.inOut')

// Where the can sits (world units) while text is on the other side.
const SIDE = 1.45
// On phones the can floats above the copy instead of beside it.
const mobile = () => window.innerWidth < 800

export function useScrollScenes(loaded: boolean) {
  useGSAP(
    () => {
      if (!loaded) return

      /* ───────── hero entrance ───────── */
      gsap
        .timeline()
        .to(can, { intro: 1, duration: 2.4, ease: 'expo.out' }, 0)
        .from('.hero-char', { yPercent: 130, rotateX: -100, stagger: 0.07, duration: 1.5, ease: 'expo.out' }, 0.05)
        .from('.reveal-up', { y: 50, autoAlpha: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out' }, 0.5)
        .from('.nav', { yPercent: -120, duration: 1.1, ease: 'expo.out' }, 0.6)
        .fromTo(can, { glow: 0 }, { glow: 1, duration: 0.12, repeat: 3, yoyo: true, ease: 'none' }, 0.8)
        .set(can, { glow: 0 })

      // jelly letters on hover
      gsap.utils.toArray<HTMLElement>('.hero-char').forEach((el) => {
        el.addEventListener('pointerenter', () => {
          gsap.fromTo(
            el,
            { scaleY: 1, scaleX: 1 },
            { keyframes: [{ scaleY: 1.25, scaleX: 0.85, duration: 0.12 }, { scaleY: 0.9, scaleX: 1.1, duration: 0.12 }, { scaleY: 1, scaleX: 1, duration: 0.5, ease: 'elastic.out(1,0.3)' }] },
          )
        })
      })

      /* ───────── hero → overview: title explodes, can drifts ───────── */
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        endTrigger: '.overview',
        end: 'top top',
        onUpdate: ({ progress: p }) => {
          can.x = 0
          can.y = lerp(0, -0.1, p)
          can.scale = lerp(1, 1.1, p)
          can.spin = p * PI
          can.tilt = 0
          can.glow = 0
          can.flavor = 0
        },
      })

      gsap.to('.hero-char-mask', {
        x: (i) => (i - 2) * window.innerWidth * 0.14,
        y: (i) => (i % 2 ? -1 : 1) * 120,
        rotate: (i) => (i - 2) * 9,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-title', {
        autoAlpha: 0,
        filter: 'blur(14px)',
        ease: 'power1.in',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-bottom, .hero-kicker', {
        y: -120,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: true },
      })

      /* ───────── velocity marquee ───────── */
      const loops = gsap.utils.toArray<HTMLElement>('.marquee-track').map((el, i) =>
        gsap.fromTo(el, { xPercent: i ? -33.333 : 0 }, { xPercent: i ? 0 : -33.333, duration: 22, ease: 'none', repeat: -1 }),
      )
      const skewTo = gsap.quickTo('.marquee-wrap', 'skewY', { duration: 0.5, ease: 'power3.out' })
      let dir = 1
      const tick = () => {
        const v = scroll.velocity
        if (Math.abs(v) > 0.5) dir = Math.sign(v)
        const speed = (1 + Math.min(12, Math.abs(v) * 0.35)) * dir
        loops.forEach((l) => l.timeScale(gsap.utils.interpolate(l.timeScale(), speed, 0.1)))
        skewTo(gsap.utils.clamp(-6, 6, v * 0.15))
      }
      gsap.ticker.add(tick)

      /* ───────── intro line: chars tumble in ───────── */
      const intro = SplitText.create('.intro-line', { type: 'words,chars', charsClass: 'ch' })
      gsap.from(intro.chars, {
        yPercent: () => gsap.utils.random(-200, 200),
        rotate: () => gsap.utils.random(-90, 90),
        scale: 0,
        autoAlpha: 0,
        stagger: { each: 0.02, from: 'random' },
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.intro', start: 'top 80%', end: 'center center', scrub: 1 },
      })

      /* ───────── pinned overview (the VOLT-style sequence) ───────── */
      const h1 = SplitText.create('.header-1 h2', { type: 'chars', charsClass: 'char', mask: 'chars' })
      const titles = SplitText.create('.tooltip .title h3', { type: 'lines', linesClass: 'line', mask: 'lines' })
      const descs = SplitText.create('.tooltip .description p', { type: 'lines', linesClass: 'line', mask: 'lines' })
      gsap.set([...titles.lines, ...descs.lines], { yPercent: 125 })
      gsap.set('.tooltip .icon span', { yPercent: 125 })

      gsap.from(h1.chars, {
        yPercent: 110,
        stagger: 0.025,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.overview', start: '75% bottom', toggleActions: 'play none none reverse' },
      })

      const tipIn = (n: number, on: boolean) =>
        gsap.to(
          [`.tooltip:nth-child(${n}) .icon span`, ...titles.lines.filter((l) => l.closest(`.tooltip:nth-child(${n})`)), ...descs.lines.filter((l) => l.closest(`.tooltip:nth-child(${n})`))],
          { yPercent: on ? 0 : 125, duration: 1, ease: 'power3.out', stagger: 0.04, overwrite: true },
        )
      const tipState = [false, false]

      const ov = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.overview',
          start: 'top top',
          end: () => `+=${window.innerHeight * 6}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: p }) => {
            can.x = 0
            can.y = 0
            can.scale = 1.1 + 0.25 * ease(range(p, 0.18, 0.32)) - 0.2 * range(p, 0.55, 0.7)
            can.spin = PI + p * 2 * PI
            can.tilt = lerp(0, -0.12, range(p, 0.5, 0.7))
            can.glow = Math.max(pulse(p, 0.26, 0.09), pulse(p, 0.66, 0.05), pulse(p, 0.86, 0.05))
            ;[0.65, 0.85].forEach((t, i) => {
              const on = p > t
              if (on !== tipState[i]) {
                tipState[i] = on
                tipIn(i + 1, on)
              }
            })
          },
        },
      })
      ov.to('.header-1', { xPercent: -100, duration: 0.3 }, 0.05)
        .fromTo('.circular-mask', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 0.1 }, 0.2)
        .fromTo('.header-2', { xPercent: 100 }, { xPercent: -110, duration: 0.35 }, 0.15)
        .fromTo('.tooltip .divider', { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.45)
        .to({}, { duration: 0.15 }, 0.85)

      /* ───────── manifesto: words ignite with scroll ───────── */
      const words = SplitText.create('.manifesto-text', { type: 'words', wordsClass: 'w' })
      gsap.fromTo(
        words.words,
        { opacity: 0.12, color: '#f3efe0' },
        {
          opacity: 1,
          keyframes: { color: ['#c6ff3d', '#f3efe0'] },
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto', start: 'top 65%', end: 'bottom 70%', scrub: true },
        },
      )
      gsap.from('.manifesto .eyebrow', {
        x: -60,
        autoAlpha: 0,
        scrollTrigger: { trigger: '.manifesto', start: 'top 75%', toggleActions: 'play none none reverse' },
      })
      ScrollTrigger.create({
        trigger: '.manifesto',
        start: 'top bottom',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          const k = ease(range(p, 0, 0.5))
          can.x = lerp(0, SIDE, k)
          can.y = mobile() ? lerp(0, 1.15, k) : 0
          can.scale = mobile() ? lerp(0.9, 0.75, k) : lerp(0.9, 1, k)
          can.spin = 3 * PI + p * 0.5 * PI
          can.tilt = lerp(-0.12, -0.2, k)
          can.glow = pulse(p, 0.25, 0.15) * 0.6
        },
      })

      /* ───────── stats: counters + lines ───────── */
      gsap.utils.toArray<HTMLElement>('.stat').forEach((el, i) => {
        const num = el.querySelector<HTMLElement>('.stat-num')!
        const target = Number(num.dataset.value)
        const obj = { v: 0 }
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
          .from(el, { y: 80, autoAlpha: 0, rotateX: -40, duration: 1, ease: 'expo.out', delay: (i % 2) * 0.1 })
          .from(el.querySelector('.stat-line'), { scaleX: 0, duration: 1, ease: 'expo.inOut' }, 0.1)
          .to(obj, { v: target, duration: 1.6, ease: 'expo.out', onUpdate: () => void (num.textContent = String(Math.round(obj.v))) }, 0.1)
      })
      ScrollTrigger.create({
        trigger: '.stats',
        start: 'top bottom',
        endTrigger: '.flavors',
        end: 'top top',
        onUpdate: ({ progress: p }) => {
          can.x = SIDE
          can.y = mobile() ? lerp(1.15, 0.85, p) : lerp(0, 0.1, p)
          can.scale = mobile() ? 0.75 : 1
          can.spin = 3.5 * PI + p * 0.5 * PI
          can.tilt = lerp(-0.2, 0, p)
          can.glow = 0
          can.flavor = 0
        },
      })

      /* ───────── flavors: pinned horizontal run, can swaps label ───────── */
      const n = flavors.length
      const setBg = (color: string) => gsap.to('.flavor-bg', { backgroundColor: color, duration: 0.8, ease: 'power2.out', overwrite: true })
      const indexEl = document.querySelector<HTMLElement>('.flavor-index')!
      let current = -1
      const fl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.flavors',
          start: 'top top',
          end: () => `+=${window.innerHeight * (n + 0.5)}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: p }) => {
            const idx = Math.min(n - 1, Math.round(range(p, 0.05, 0.95) * (n - 1)))
            const k = ease(range(p, 0, 0.06))
            can.x = lerp(SIDE, mobile() ? 0 : -SIDE, k)
            can.y = mobile() ? 0.85 : 0
            can.scale = mobile() ? 0.95 : 1.05
            can.spin = 4 * PI + idx * 2 * PI + (range(p, 0.05, 0.95) * (n - 1) - idx) * 0.6
            can.tilt = lerp(0, 0.12, k)
            can.glow = 0
            can.flavor = idx
            if (idx !== current) {
              current = idx
              setBg(flavors[idx].bg)
              indexEl.textContent = `0${idx + 1}`
              gsap.fromTo(indexEl, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' })
            }
          },
        },
      })
      fl.to('.flavor-track', { x: () => -(n - 1) * window.innerWidth, duration: 0.9 }, 0.05).fromTo(
        '.flavor-progress span',
        { scaleX: 0 },
        { scaleX: 1, duration: 1 },
        0,
      )
      gsap.utils.toArray<HTMLElement>('.flavor').forEach((panel) => {
        const st = { containerAnimation: fl, trigger: panel, start: 'left 80%', end: 'left 10%', scrub: true }
        gsap.from(panel.querySelector('.flavor-name'), { xPercent: 60, skewX: -20, autoAlpha: 0, ease: 'power2.out', scrollTrigger: st })
        gsap.from(panel.querySelectorAll('.flavor-tag, .flavor-notes, .flavor-num'), {
          y: 60,
          autoAlpha: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: st,
        })
      })

      /* ───────── outro: circle wipe, giant letters, can centers ───────── */
      gsap.fromTo(
        '.outro',
        { clipPath: 'circle(0% at 50% 100%)' },
        { clipPath: 'circle(150% at 50% 100%)', ease: 'none', scrollTrigger: { trigger: '.outro', start: 'top bottom', end: 'top 20%', scrub: true } },
      )
      gsap.from('.outro-char', {
        yPercent: 120,
        scaleY: 2.2,
        rotate: (i) => (i % 2 ? 10 : -10),
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.outro', start: 'top 60%', end: 'top top', scrub: 1 },
      })
      gsap.from('.outro-kicker, .outro .btn', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: '.outro', start: 'top 30%', toggleActions: 'play none none reverse' },
      })
      ScrollTrigger.create({
        trigger: '.outro',
        start: 'top bottom',
        end: 'top top',
        onUpdate: ({ progress: p }) => {
          const k = ease(p)
          can.x = lerp(mobile() ? 0 : -SIDE, 0, k)
          can.y = lerp(mobile() ? 0.85 : 0, -0.15, k)
          can.scale = lerp(1.05, 1.25, k)
          can.spin = 4 * PI + (n - 1) * 2 * PI + k * 2 * PI
          can.tilt = lerp(0.12, 0, k)
          can.glow = pulse(p, 0.85, 0.15)
        },
      })

      /* ───────── footer: can blasts off ───────── */
      ScrollTrigger.create({
        trigger: '.footer',
        start: 'top bottom',
        end: 'bottom bottom',
        onUpdate: ({ progress: p }) => {
          const k = gsap.parseEase('power2.in')(p)
          can.x = 0
          can.y = lerp(-0.15, 4, k)
          can.scale = lerp(1.25, 0.8, k)
          can.spin = 4 * PI + n * 2 * PI + k * 3 * PI
          can.tilt = lerp(0, -0.4, k)
          can.glow = k
        },
      })
      const foot = SplitText.create('.footer-big', { type: 'chars', mask: 'chars' })
      gsap.from(foot.chars, {
        yPercent: 100,
        stagger: 0.06,
        ease: 'expo.out',
        duration: 1.2,
        scrollTrigger: { trigger: '.footer', start: 'top 70%', toggleActions: 'play none none reverse' },
      })

      /* ───────── nav: text scramble on hover ───────── */
      const glyphs = 'DILL⚡#%&*+=<>/BRINE'
      gsap.utils.toArray<HTMLElement>('.scramble').forEach((el) => {
        const text = el.dataset.text ?? el.textContent ?? ''
        el.addEventListener('pointerenter', () => {
          const o = { p: 0 }
          gsap.to(o, {
            p: 1,
            duration: 0.5,
            ease: 'none',
            onUpdate: () => {
              const shown = Math.floor(o.p * text.length)
              el.textContent = text
                .split('')
                .map((c, i) => (i < shown ? c : glyphs[(Math.random() * glyphs.length) | 0]))
                .join('')
            },
            onComplete: () => {
              el.textContent = text
            },
          })
        })
      })

      ScrollTrigger.refresh()

      return () => gsap.ticker.remove(tick)
    },
    { dependencies: [loaded] },
  )
}
