export function Bolt({ className }: { className?: string }) {
  return (
    <svg className={`bolt ${className ?? ''}`} viewBox="0 0 30 46" aria-hidden>
      <path d="M20 0 2 26h11l-5 20 20-29H17z" fill="currentColor" />
    </svg>
  )
}
