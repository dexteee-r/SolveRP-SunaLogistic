'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 15000

function SandParticles({ phase }: { phase: 'enter' | 'exit' | 'idle' }) {
  const meshRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const startTimeRef = useRef(0)
  const hasReset = useRef(false)

  const [positions, velocities, randoms] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const rnd = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
      vel[i * 3]     = Math.random() * 0.06 + 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.025
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      rnd[i] = Math.random() * Math.PI * 2
    }
    return [pos, vel, rnd]
  }, [])

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [positions])

  useEffect(() => {
    if (phase !== 'idle') {
      hasReset.current = false
      startTimeRef.current = 0
    }
  }, [phase])

  useFrame((state) => {
    if (phase === 'idle' || !meshRef.current || !geoRef.current) return
    const posAttr = geoRef.current.attributes.position as THREE.BufferAttribute
    if (!posAttr) return
    const arr = posAttr.array as Float32Array
    const t = state.clock.elapsedTime

    if (!hasReset.current) {
      startTimeRef.current = t
      hasReset.current = true
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3]     = (Math.random() - 0.5) * 12
        arr[i * 3 + 1] = (Math.random() - 0.5) * 8
        arr[i * 3 + 2] = (Math.random() - 0.5) * 3
      }
    }

    const elapsed = t - startTimeRef.current

    if (phase === 'enter') {
      const intensity = Math.min(elapsed * 2.5, 1)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        arr[i3]     -= velocities[i3] * intensity * 3
        arr[i3 + 1] += Math.sin(t * 3 + randoms[i]) * 0.012 * intensity
        arr[i3 + 2] += Math.cos(t * 2 + randoms[i] * 2) * 0.005
        if (arr[i3] < -7) arr[i3] = 7 + Math.random() * 2
      }
    } else if (phase === 'exit') {
      const intensity = Math.min(elapsed * 2, 1)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const angle = randoms[i]
        arr[i3]     += Math.cos(angle) * velocities[i3] * intensity * 4
        arr[i3 + 1] += Math.sin(angle) * 0.03 * intensity + Math.sin(t * 4 + randoms[i]) * 0.008
        arr[i3 + 2] += velocities[i3 + 2] * intensity * 2
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.018}
        color="#C2A378"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function SandStorm({ phase }: { phase: 'enter' | 'exit' | 'idle' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
    >
      <SandParticles phase={phase} />
    </Canvas>
  )
}
