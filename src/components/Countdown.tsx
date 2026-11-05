import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Counts down to the first of next month, when the mystery can drops.
function nextDrop() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 12, 0, 0)
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return [
    ['Days', Math.floor(s / 86400)],
    ['Hrs', Math.floor((s % 86400) / 3600)],
    ['Min', Math.floor((s % 3600) / 60)],
    ['Sec', s % 60],
  ] as const
}

export default function Countdown() {
  const target = useRef(nextDrop())
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="countdown">
      {parts(target.current.getTime() - now).map(([label, value]) => (
        <div className="cd-cell" key={label}>
          <Digit value={String(value).padStart(2, '0')} />
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

// Each change flips the old number up and out, the new one up and in.
function Digit({ value }: { value: string }) {
  const el = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    if (prev.current === value || !el.current) return
    prev.current = value
    gsap.fromTo(el.current, { yPercent: 60, rotateX: -80, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' })
  }, [value])
  return (
    <span className="cd-num">
      <span ref={el}>{value}</span>
    </span>
  )
}
