import * as THREE from 'three'

// Injects animated electric "brine arcs" + a fresnel rim into a standard
// material. Intensity is driven by uGlow (scroll events, flavor swaps, speed).
export function electrify(material: THREE.MeshPhysicalMaterial, accent: THREE.Color) {
  const uniforms = {
    uTime: { value: 0 },
    uGlow: { value: 0 },
    uAccent: { value: accent },
  }

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vArcUv;\nvarying vec3 vWorldN;\nvarying vec3 vWorldP;')
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
        vArcUv = uv;
        vWorldN = normalize(mat3(modelMatrix) * objectNormal);
        vWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        uniform float uGlow;
        uniform vec3 uAccent;
        varying vec2 vArcUv;
        varying vec3 vWorldN;
        varying vec3 vWorldP;

        float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash21(i), hash21(i + vec2(1,0)), u.x),
                     mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; }
          return v;
        }
        float arcs(vec2 uv, float t){
          float s = 0.0;
          for (int i = 0; i < 3; i++){
            float fi = float(i);
            vec2 p = vec2(uv.x * 7.0 + fi * 3.1, uv.y * 2.5 - t * (0.9 + fi * 0.35));
            float n = fbm(p + 2.0 * fbm(p * 1.3 + vec2(t * 0.7, -t)));
            s += 0.010 / (abs(n - 0.5) + 0.006);
          }
          return s;
        }`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float flicker = 0.75 + 0.25 * sin(uTime * 37.0) * sin(uTime * 11.0);
        float a = arcs(vArcUv, uTime) * flicker;
        vec3 viewDir = normalize(cameraPosition - vWorldP);
        float fres = pow(1.0 - max(dot(normalize(vWorldN), viewDir), 0.0), 3.0);
        totalEmissiveRadiance += uAccent * (min(a, 6.0) * 1.6 + fres * 3.0) * uGlow;
        totalEmissiveRadiance += uAccent * fres * 0.35;`,
      )
  }

  return uniforms
}
