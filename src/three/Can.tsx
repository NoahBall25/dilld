import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { flavors } from '../content'
import { can, pointer, scroll } from '../store'
import { makeLabel } from './labelTexture'
import { electrify } from './brineShader'

const R = 0.52
const BODY = 1.7

const damp = THREE.MathUtils.damp

export function Can() {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const viewport = useThree((s) => s.viewport)

  const labels = useMemo(() => flavors.map(makeLabel), [])
  const accents = useMemo(() => flavors.map((f) => new THREE.Color(f.accent)), [])

  const { bodyMat, uniforms } = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      map: labels[0],
      metalness: 0.55,
      roughness: 0.26,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    })
    const u = electrify(m, accents[0].clone())
    return { bodyMat: m, uniforms: u }
  }, [labels, accents])

  const metal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d9dee2', metalness: 1, roughness: 0.22 }),
    [],
  )

  const { top, bottom } = useMemo(() => {
    const t = [
      [R, 0], [R * 0.995, 0.04], [0.47, 0.13], [0.435, 0.19], [0.432, 0.205],
      [0.448, 0.215], [0.447, 0.232], [0.43, 0.236], [0.405, 0.215], [0.395, 0.2], [0, 0.2],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    const b = [
      [0, -0.05], [0.3, -0.07], [0.38, -0.105], [0.43, -0.11], [0.48, -0.075], [R * 0.995, -0.025], [R, 0],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return {
      top: new THREE.LatheGeometry(t, 96),
      bottom: new THREE.LatheGeometry(b, 96),
    }
  }, [])

  const state = useRef({ flavor: 0, pulse: 0, x: 0, y: 0, s: 0, spin: 0, tilt: 0, glow: 0 })

  useFrame((frame, dt) => {
    const st = state.current
    const g = group.current
    const i = inner.current
    if (!g || !i) return
    const t = frame.clock.elapsedTime

    // flavor swap → new label + an electric flash
    if (can.flavor !== st.flavor) {
      st.flavor = can.flavor
      bodyMat.map = labels[st.flavor]
      bodyMat.needsUpdate = true
      st.pulse = 1
    }
    uniforms.uAccent.value.lerp(accents[st.flavor], 1 - Math.exp(-dt * 6))
    st.pulse = Math.max(0, st.pulse - dt * 1.4)

    // responsive: narrow screens keep the can centered and smaller
    const wide = Math.min(1, viewport.width / 7)
    const sizeK = viewport.width < 4 ? 0.72 : 1

    st.x = damp(st.x, can.x * wide, 4, dt)
    st.y = damp(st.y, can.y, 4, dt)
    st.s = damp(st.s, can.scale * can.intro * sizeK, 5, dt)
    st.spin = damp(st.spin, can.spin, 3.5, dt)
    st.tilt = damp(st.tilt, can.tilt + THREE.MathUtils.clamp(scroll.velocity * 0.004, -0.35, 0.35), 4, dt)

    const speedGlow = Math.min(1, Math.abs(scroll.velocity) / 45) * 0.55
    st.glow = damp(st.glow, Math.max(can.glow, st.pulse, speedGlow), 8, dt)
    uniforms.uGlow.value = st.glow
    uniforms.uTime.value = t

    g.position.set(st.x, st.y + Math.sin(t * 1.2) * 0.06, 0)
    g.scale.setScalar(st.s)
    g.rotation.z = st.tilt + Math.sin(t * 0.8) * 0.04

    // entrance spin + scroll spin + pointer steer
    const introSpin = (1 - can.intro) * Math.PI * 3
    i.rotation.y = damp(i.rotation.y, Math.PI + st.spin + introSpin + pointer.x * 0.6 + Math.sin(t * 0.5) * 0.15, 6, dt)
    i.rotation.x = damp(i.rotation.x, pointer.y * 0.25, 4, dt)
  })

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh material={bodyMat} castShadow>
          <cylinderGeometry args={[R, R, BODY, 128, 1, true]} />
        </mesh>
        <mesh geometry={top} material={metal} position={[0, BODY / 2, 0]} />
        <mesh geometry={bottom} material={metal} position={[0, -BODY / 2, 0]} />
        {/* pull tab */}
        <group position={[0, BODY / 2 + 0.215, 0.06]} rotation={[-Math.PI / 2 + 0.08, 0, 0]}>
          <mesh material={metal}>
            <torusGeometry args={[0.07, 0.022, 12, 32]} />
          </mesh>
          <mesh material={metal} position={[0, -0.12, 0]}>
            <boxGeometry args={[0.1, 0.14, 0.018]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
