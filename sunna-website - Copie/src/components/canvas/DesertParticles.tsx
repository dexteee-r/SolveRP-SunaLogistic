'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '@/providers/SmoothScrollProvider'
import { sandParticleVertexShader, sandParticleFragmentShader } from '@/shaders/desert'

const PARTICLE_COUNT = 2500

export default function DesertParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, randoms, scales, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const rnd = new Float32Array(PARTICLE_COUNT)
    const scl = new Float32Array(PARTICLE_COUNT)
    const spd = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread across the desert landscape
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = Math.random() * 5 - 1

      rnd[i] = Math.random()
      scl[i] = 0.3 + Math.random() * 1.5
      spd[i] = 0.3 + Math.random() * 1.2
    }

    return { positions: pos, randoms: rnd, scales: scl, speeds: spd }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    const points = pointsRef.current
    if (!points) return

    const mat = points.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = clock.getElapsedTime()
    mat.uniforms.uScrollProgress.value = scrollState.progress
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          array={randoms}
          count={PARTICLE_COUNT}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aScale"
          array={scales}
          count={PARTICLE_COUNT}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          array={speeds}
          count={PARTICLE_COUNT}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={sandParticleVertexShader}
        fragmentShader={sandParticleFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
