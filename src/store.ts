// Shared mutable state between the DOM scroll timelines (GSAP writes)
// and the WebGL scene (useFrame reads + lerps). Plain objects, no re-renders.

export const can = {
  x: 0, // world units, multiplied by a responsive factor in the scene
  y: 0,
  scale: 1,
  spin: 0, // extra rotation around Y driven by scroll
  tilt: 0, // rotation around Z
  glow: 0, // 0..1 electric arc intensity
  flavor: 0,
  intro: 0, // 0..1 entrance after the loader
}

export const pointer = { x: 0, y: 0 }

export const scroll = { velocity: 0 }
