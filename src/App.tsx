import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { copy, flavors } from './content'
import { scroll } from './store'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { Bolt } from './components/Bolt'
import { useScrollScenes } from './useScrollScenes'

gsap.registerPlugin(ScrollTrigger)

const Experience = lazy(() => import('./three/Experience'))

export default function App() {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // wait for fonts (the can label is painted with them) and a minimum beat for the loader
  useEffect(() => {
    const fonts = Promise.all([
      document.fonts.load('400 100px Anton'),
      document.fonts.load('500 30px "Space Grotesk"'),
    ]).catch(() => undefined)
    const beat = new Promise((r) => setTimeout(r, 1800))
    Promise.all([fonts, beat]).then(() => setReady(true))
  }, [])

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, anchors: true })
    lenisRef.current = lenis
    lenis.stop()
    lenis.on('scroll', (l: Lenis) => {
      scroll.velocity = l.velocity
      ScrollTrigger.update()
    })
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (loaded) lenisRef.current?.start()
  }, [loaded])

  useScrollScenes(loaded)

  return (
    <>
      {!loaded && <Loader ready={ready} onDone={() => setLoaded(true)} />}
      <Cursor />
      <div className="grain" aria-hidden />
      {ready && (
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      )}

      <nav className="nav">
        <a href="#top" className="nav-logo" data-hover>
          <Bolt /> {copy.brand}
        </a>
        <div className="nav-links">
          {['Flavors', 'Science', 'Story'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="scramble" data-text={l}>
              {l}
            </a>
          ))}
        </div>
        <a href="#shop" className="btn btn-small" data-magnetic>
          {copy.cta}
        </a>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" />
          <p className="hero-kicker reveal-up">
            <Bolt /> {copy.heroKicker}
          </p>
          <h1 className="hero-title" aria-label={copy.brand}>
            {copy.brand.split('').map((c, i) => (
              <span className="hero-char-mask" key={i}>
                <span className="hero-char" data-hover>
                  {c}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero-bottom">
            <p className="hero-sub reveal-up">{copy.heroSub}</p>
            <div className="scroll-cue reveal-up">
              <span>Scroll to crack one open</span>
              <span className="scroll-line" />
            </div>
          </div>
        </section>

        <section className="marquee-wrap" aria-hidden>
          {[0, 1].map((row) => (
            <div className={`marquee marquee-${row}`} key={row}>
              <div className="marquee-track">
                {[...copy.marquee, ...copy.marquee, ...copy.marquee].map((w, i) => (
                  <span key={i}>
                    {w} <Bolt />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="intro">
          <h2 className="intro-line">{copy.intro}</h2>
        </section>

        <section className="overview" id="science">
          <div className="header-1">
            <h2>{copy.header1}</h2>
          </div>
          <div className="circular-mask" />
          <div className="header-2">
            <h2>{copy.header2}</h2>
          </div>
          <div className="tooltips">
            {copy.tooltips.map((t) => (
              <div className="tooltip" key={t.title}>
                <div className="icon">
                  <span>
                    <Bolt />
                  </span>
                </div>
                <div className="divider" />
                <div className="title">
                  <h3>{t.title}</h3>
                </div>
                <div className="description">
                  <p>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="manifesto" id="story">
          <p className="eyebrow">
            <Bolt /> The Story
          </p>
          <p className="manifesto-text">{copy.manifesto}</p>
        </section>

        <section className="stats">
          {copy.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-line" />
              <p>{s.label}</p>
            </div>
          ))}
        </section>

        <section className="flavors" id="flavors">
          <div className="flavor-bg" />
          <div className="flavor-counter">
            <span className="flavor-index">01</span> / 0{flavors.length}
          </div>
          <div className="flavor-track">
            {flavors.map((f, i) => (
              <article className="flavor" key={f.name} style={{ ['--accent' as string]: f.accent, ['--ink' as string]: f.ink }}>
                <span className="flavor-num">0{i + 1}</span>
                <h3 className="flavor-name">{f.name}</h3>
                <p className="flavor-tag">{f.tagline}</p>
                <p className="flavor-notes">{f.notes}</p>
              </article>
            ))}
          </div>
          <div className="flavor-progress">
            <span />
          </div>
        </section>

        <section className="outro" id="shop">
          <p className="outro-kicker">{copy.outroKicker}</p>
          <h2 className="outro-title">
            {copy.outro.split('').map((c, i) => (
              <span className="outro-char" key={i}>
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </h2>
          <a href="#shop" className="btn btn-big" data-magnetic>
            <span>{copy.cta}</span> <Bolt />
          </a>
        </section>

        <footer className="footer">
          <div className="footer-big">{copy.brand}</div>
          <div className="footer-row">
            <span>© {new Date().getFullYear()} DILLD Brine Co.</span>
            <span>Stay salty.</span>
            <span>Instagram · TikTok · X</span>
          </div>
        </footer>
      </main>
    </>
  )
}
