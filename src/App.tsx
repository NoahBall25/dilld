import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { copy, flavors, footerLinks, menu, tag } from './content'
import { scroll } from './store'
import { brand, loadBrand, LOGO_URL } from './brand'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { Bolt } from './components/Bolt'
import Countdown from './components/Countdown'
import { useScrollScenes } from './useScrollScenes'

gsap.registerPlugin(ScrollTrigger)

const Experience = lazy(() => import('./three/Experience'))

function SectionTag({ id }: { id: string }) {
  const t = tag(id)
  return (
    <p className="section-tag">
      <span>{t.num}</span> {t.label}
    </p>
  )
}

function Logo({ className }: { className?: string }) {
  const [hasLogo, setHasLogo] = useState(!!brand.logo)
  useEffect(() => {
    loadBrand().then(() => setHasLogo(!!brand.logo))
  }, [])
  return hasLogo ? (
    <img src={LOGO_URL} alt={copy.brand} className={`logo-img ${className ?? ''}`} />
  ) : (
    <span className={className}>
      <Bolt /> {copy.brand}
    </span>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [joined, setJoined] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // wait for fonts + logo (the can label is painted with them) and a minimum beat for the loader
  useEffect(() => {
    const fonts = Promise.all([
      document.fonts.load('400 100px Anton'),
      document.fonts.load('500 30px "Space Grotesk"'),
    ]).catch(() => undefined)
    const beat = new Promise((r) => setTimeout(r, 1800))
    Promise.all([fonts, loadBrand(), beat]).then(() => setReady(true))
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
        <a href="#home" className="nav-logo" data-hover>
          <Logo />
        </a>
        <div className="nav-links">
          {menu.map((m, i) => (
            <a key={m.id} href={`#${m.id}`} className="nav-link" data-section={m.id}>
              <sup>0{i + 1}</sup>
              <span className="scramble" data-text={m.label}>
                {m.label}
              </span>
            </a>
          ))}
        </div>
        <a href="/blog/" className="nav-blog" data-hover>
          Blog
        </a>
        <a href="#shop" className="btn btn-small nav-cta" data-magnetic>
          {copy.cta}
        </a>
        <button
          className={`burger ${menuOpen ? 'is-open' : ''}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        {menu.map((m, i) => (
          <a key={m.id} href={`#${m.id}`} onClick={() => setMenuOpen(false)} style={{ ['--i' as string]: i }}>
            <sup>0{i + 1}</sup>
            {m.label}
          </a>
        ))}
        <a href="/blog/" style={{ ['--i' as string]: menu.length }}>
          <sup>→</sup>
          Blog
        </a>
      </div>

      <main>
        {/* 01 Home: hero, marquee and the intro line belong together */}
        <div id="home">
          <section className="hero">
            <div className="hero-glow" />
            <SectionTag id="home" />
            <p className="hero-kicker reveal-up">
              <Bolt /> {copy.heroKicker}
            </p>
            <h1 className="hero-title">
              <span className="sr-only">DILL'D Pickle Energy Drink</span>
              {copy.brand.split('').map((c, i) => (
                <span className="hero-char-mask" key={i}>
                  <span className="hero-char" data-hover aria-hidden>
                    {c}
                  </span>
                </span>
              ))}
            </h1>
            <div className="hero-bottom">
              <div className="hero-copy">
                <p className="hero-sub reveal-up">{copy.heroSub}</p>
                <ul className="hero-badges reveal-up">
                  {copy.heroBadges.map((b) => (
                    <li key={b}>
                      <Bolt /> {b}
                    </li>
                  ))}
                </ul>
              </div>
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
        </div>

        <section className="overview" id="science">
          <SectionTag id="science" />
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
          <SectionTag id="story" />
          <h2 className="story-title">{copy.storyTitle}</h2>
          <p className="manifesto-text">{copy.manifesto}</p>
        </section>

        <section className="stats" id="facts">
          <SectionTag id="facts" />
          <h2 className="stats-title">{copy.factsTitle}</h2>
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

        <section className="flavors" id="shop">
          <div className="flavor-bg" />
          <SectionTag id="shop" />
          <div className="flavor-counter">
            <span className="flavor-index">01</span> / 0{flavors.length}
          </div>
          <div className="flavor-track">
            {flavors.map((f, i) => (
              <article className="flavor" key={f.name} style={{ ['--accent' as string]: f.accent, ['--ink' as string]: f.ink }}>
                <figure className="flavor-shot">
                  <img src={f.image} alt={`DILL'D ${f.name} pickle energy drink can`} loading="lazy" width={340} height={560} />
                  <figcaption>{f.badge}</figcaption>
                </figure>
                <span className="flavor-num">
                  0{i + 1} · {copy.shopTitle}
                </span>
                <h3 className="flavor-name">{f.name}</h3>
                <p className="flavor-tag">{f.tagline}</p>
                <p className="flavor-notes">{f.notes}</p>
                <div className="flavor-buy">
                  <span className="flavor-price">
                    {f.price} <small>355ml / 12 fl oz</small>
                  </span>
                  <button className="btn btn-buy" data-magnetic>
                    Add to cart <Bolt />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="flavor-progress">
            <span />
          </div>
        </section>

        <section className="drop" id="drop">
          <SectionTag id="drop" />
          <div className="drop-inner">
            <p className="drop-kicker">
              <Bolt /> {copy.dropKicker}
            </p>
            <h2 className="drop-title">{copy.dropTitle}</h2>
            <p className="drop-body">{copy.dropBody}</p>
            <Countdown />
            <form
              className={`drop-form ${joined ? 'is-joined' : ''}`}
              onSubmit={(e) => {
                e.preventDefault()
                setJoined(true)
              }}
            >
              {joined ? (
                <p className="drop-thanks">{copy.dropThanks}</p>
              ) : (
                <>
                  <input type="email" required placeholder="you@email.com" aria-label="Email" />
                  <button className="btn" type="submit" data-magnetic>
                    {copy.dropCta}
                  </button>
                </>
              )}
            </form>
          </div>
        </section>

        <section className="tiktok" id="tiktok">
          <SectionTag id="tiktok" />
          <h2 className="tiktok-title">{copy.tiktokTitle}</h2>
          <div className="tiktok-row">
            {copy.tiktok.map((v) => {
              const f = flavors[v.flavor]
              return (
                <article
                  className="tt-card"
                  key={v.handle}
                  data-hover
                  style={{ ['--bg' as string]: f.bg, ['--accent' as string]: f.accent }}
                >
                  <img className="tt-img" src={v.image} alt={`${v.handle} drinking DILL'D ${f.name}`} loading="lazy" />
                  <div className="tt-glow" />
                  <span className="tt-likes">♥ {v.views}</span>
                  <div className="tt-play">▶</div>
                  <div className="tt-meta">
                    <span className="tt-handle">{v.handle}</span>
                    <p>“{v.caption}”</p>
                    <span className="tt-views">{v.tag}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <footer className="footer">
          <div className="outro">
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
          </div>
          <div className="footer-end">
            <div className="footer-big">{copy.brand}</div>
            <div className="footer-grid">
              <div className="footer-col footer-brand">
                <img src="/brand/logo-mascot.png" alt="DILL'D mascot logo: May cause extreme dill-ness" width={220} height={220} loading="lazy" />
                <p>Electrolytes, sour bite and 180mg of pure brine bravado. Quebec born, worldwide shocked.</p>
              </div>
              <nav className="footer-col" aria-label="Quick links">
                <h3>Quick links</h3>
                {footerLinks.quick.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
              <nav className="footer-col" aria-label="Social">
                <h3>Drop dispatch</h3>
                {footerLinks.social.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener">
                    {l.label} ↗
                  </a>
                ))}
              </nav>
              <form className="footer-col footer-news" onSubmit={(e) => e.preventDefault()}>
                <h3>Global dispatch newsletter</h3>
                <p>VIP drop alerts, secret codes and sour restock notifications before anyone else.</p>
                <div>
                  <input type="email" placeholder="brine_addict@email.com" aria-label="Email for newsletter" required />
                  <button className="btn btn-small" type="submit">
                    Join
                  </button>
                </div>
              </form>
            </div>
            <p className="footer-notice">
              <strong>Caution / health notice:</strong> {copy.healthNotice} <span>{copy.shipping}</span>
            </p>
            <div className="footer-row">
              <span>© {new Date().getFullYear()} DILL'D Beverages Inc. All rights reserved.</span>
              <span className="footer-legal">
                {footerLinks.legal.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
