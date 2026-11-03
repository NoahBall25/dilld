import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { copy } from '../content'

export default function Loader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const progress = useRef({ v: 0 })

  useGSAP(
    () => {
      gsap.from('.loader-letter', { yPercent: 120, rotate: 12, stagger: 0.08, duration: 1, ease: 'expo.out' })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      const n = progress.current
      gsap.to(n, {
        overwrite: true,
        v: ready ? 100 : 82,
        duration: ready ? 0.8 : 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, '0')
          gsap.set('.loader-bar span', { scaleX: n.v / 100 })
        },
        onComplete: () => {
          if (!ready) return
          gsap
            .timeline({ onComplete: onDone })
            .to('.loader-letter', { yPercent: -120, rotate: -8, stagger: 0.05, duration: 0.6, ease: 'expo.in' })
            .to('.loader-meta', { autoAlpha: 0, duration: 0.3 }, '<')
            .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, '-=0.15')
        },
      })
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <div className="loader" ref={root}>
      <div className="loader-word">
        {copy.brand.split('').map((c, i) => (
          <span className="loader-mask" key={i}>
            <span className="loader-letter">{c}</span>
          </span>
        ))}
      </div>
      <div className="loader-meta">
        <span>Curing the brine</span>
        <span className="loader-bar">
          <span />
        </span>
        <span ref={count}>000</span>
      </div>
    </div>
  )
}
