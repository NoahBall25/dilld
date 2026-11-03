import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { pointer } from '../store'

// Lagging ring + dot cursor that swells over interactive elements,
// plus magnetic pull on anything marked [data-magnetic].
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      if (!fine) return
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      const hot = (e.target as HTMLElement).closest('a, button, [data-hover]')
      ring.current?.classList.toggle('is-hot', !!hot)
    }
    window.addEventListener('pointermove', move)

    const cleanups: (() => void)[] = []
    if (fine) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * 0.4)
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4)
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        })
      })
    }

    return () => {
      window.removeEventListener('pointermove', move)
      cleanups.forEach((c) => c())
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ring} />
      <div className="cursor-dot" ref={dot} />
    </>
  )
}
