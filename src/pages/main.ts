// Motion layer for the static pages (blog, articles, legal).
// Content is fully rendered in the HTML for SEO; this only animates it.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import './pages.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -90 } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)

  // headline: chars drop in with a wobble
  document.fonts.ready.then(() => {
    document.querySelectorAll<HTMLElement>('.split').forEach((el) => {
      const split = SplitText.create(el, { type: 'words,chars', mask: 'chars' })
      gsap.from(split.chars, { yPercent: 120, rotate: 8, stagger: 0.025, duration: 1.1, ease: 'expo.out', delay: 0.1 })
    })
  })

  gsap.from('.crumbs, .eyebrow, .chip, .a-meta, .b-sub', { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'power3.out', delay: 0.3 })
  gsap.from('.a-cover', { clipPath: 'inset(12% 12% 12% 12% round 24px)', scale: 1.08, duration: 1.6, ease: 'expo.out', delay: 0.4 })
  gsap.to('.a-cover img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.a-cover', start: 'top top', end: 'bottom top', scrub: true } })

  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 70,
      rotate: (Number(el.style.getPropertyValue('--i')) % 2 ? 1.5 : -1.5),
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    })
  })

  // article body: headings slide, paragraphs fade
  gsap.utils.toArray<HTMLElement>('.a-body > *').forEach((el) => {
    gsap.from(el, { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  })

  // magnetic buttons
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * 0.35)
      y((e.clientY - r.top - r.height / 2) * 0.35)
    })
    el.addEventListener('pointerleave', () => {
      x(0)
      y(0)
    })
  })

  // cards tilt toward the pointer
  document.querySelectorAll<HTMLElement>('.b-card, .b-feat-card').forEach((el) => {
    const rx = gsap.quickTo(el, 'rotateX', { duration: 0.5 })
    const ry = gsap.quickTo(el, 'rotateY', { duration: 0.5 })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 8)
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8)
    })
    el.addEventListener('pointerleave', () => {
      rx(0)
      ry(0)
    })
  })
}

// reading progress
const bar = document.querySelector<HTMLElement>('.progress span')
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight
  if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`
}
addEventListener('scroll', onScroll, { passive: true })
onScroll()

// table of contents: highlight the section in view
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('.a-toc a')]
if (tocLinks.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        tocLinks.forEach((a) => a.classList.toggle('is-on', a.hash === '#' + en.target.id))
      })
    },
    { rootMargin: '-30% 0px -60% 0px' },
  )
  tocLinks.forEach((a) => {
    const t = document.querySelector(a.hash)
    if (t) io.observe(t)
  })
}

// blog category filter
const filters = [...document.querySelectorAll<HTMLButtonElement>('.b-filters button')]
filters.forEach((btn) =>
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.toggle('is-on', b === btn))
    const f = btn.dataset.filter
    document.querySelectorAll<HTMLElement>('.b-list .b-card').forEach((c) => {
      const show = f === 'all' || c.dataset.cat === f
      gsap.to(c, { autoAlpha: show ? 1 : 0, scale: show ? 1 : 0.92, duration: 0.35, onComplete: () => void (c.style.display = show ? '' : 'none'), onStart: () => void (show && (c.style.display = '')) })
    })
  }),
)
