import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Can } from './Can'
import { scroll } from '../store'

// Rising brine bubbles + dill seeds around the can.
function Bubbles({ count = 520 }) {
  const ref = useRef<THREE.Points>(null)
  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1
      seed[i] = Math.random()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uBoost: { value: 0 } },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uBoost;
        attribute float aSeed;
        varying float vSeed;
        void main(){
          vSeed = aSeed;
          vec3 p = position;
          float speed = 0.25 + aSeed * 0.6 + uBoost;
          p.y = mod(p.y + uTime * speed + 4.0, 8.0) - 4.0;
          p.x += sin(uTime * (0.6 + aSeed) + aSeed * 40.0) * 0.18;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (6.0 + aSeed * 22.0) * (1.0 / -mv.z) * 6.0;
        }`,
      fragmentShader: /* glsl */ `
        varying float vSeed;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float ring = smoothstep(0.5, 0.42, d) * (0.35 + smoothstep(0.25, 0.45, d));
          vec3 col = mix(vec3(0.55, 0.85, 0.2), vec3(0.85, 1.0, 0.35), vSeed);
          gl_FragColor = vec4(col, ring * (0.25 + vSeed * 0.45));
        }`,
    })
    return { geo, mat }
  }, [count])

  useFrame((s, dt) => {
    mat.uniforms.uTime.value = s.clock.elapsedTime
    mat.uniforms.uBoost.value = THREE.MathUtils.damp(mat.uniforms.uBoost.value, Math.min(2, Math.abs(scroll.velocity) / 20), 3, dt)
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.1) * 0.2
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

function Aberration() {
  const offset = useMemo(() => new THREE.Vector2(0, 0), [])
  useFrame((_, dt) => {
    const v = Math.min(1, Math.abs(scroll.velocity) / 60)
    offset.x = THREE.MathUtils.damp(offset.x, 0.0008 + v * 0.006, 6, dt)
    offset.y = offset.x * 0.6
  })
  return <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} blendFunction={BlendFunction.NORMAL} />
}

export default function Experience() {
  return (
    <div className="webgl">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, -4]} intensity={1.4} color="#c6ff3d" />
        <pointLight position={[0, -2, 3]} intensity={6} color="#d4ff3f" distance={8} />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={3} color="#d4ff3f" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 1.2, 1]} />
          <Lightformer form="rect" intensity={2} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 0.6, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 0, 6]} scale={3} />
        </Environment>

        <Can />
        <Bubbles />

        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.85} luminanceSmoothing={0.2} radius={0.7} />
          <Aberration />
          <Vignette eskil={false} offset={0.25} darkness={0.35} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
