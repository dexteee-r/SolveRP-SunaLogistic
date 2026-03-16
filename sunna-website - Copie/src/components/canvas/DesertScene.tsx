'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SandDunes from './SandDunes'
import DesertParticles from './DesertParticles'
import DesertEffects from './DesertEffects'
import { scrollState } from '@/providers/SmoothScrollProvider'

// Camera controller — parallax + scroll
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const { mouse, progress } = scrollState
    const t = clock.getElapsedTime()

    // Base position — elevated view over dunes
    const baseY = 8 + progress * 5
    const baseZ = 18 - progress * 4

    // Mouse parallax
    const targetX = mouse.x * 1.2
    const targetY = baseY + mouse.y * 0.6
    const targetZ = baseZ

    // Smooth follow
    camera.position.x += (targetX - camera.position.x) * 0.03
    camera.position.y += (targetY - camera.position.y) * 0.03
    camera.position.z += (targetZ - camera.position.z) * 0.03

    // Subtle breathing
    camera.position.y += Math.sin(t * 0.3) * 0.05

    // Look toward the horizon
    camera.lookAt(0, -2 + progress * 2, -10)
  })

  return null
}

export default function DesertScene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 8, 18], fov: 60, near: 0.1, far: 150 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#f3d7a3']} />
        <fog attach="fog" args={['#f3d7a3', 15, 80]} />

        <ambientLight intensity={0.6} color="#D4A574" />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.4}
          color="#FFD4A0"
        />
        <directionalLight
          position={[-5, 8, -3]}
          intensity={0.3}
          color="#C4956A"
        />

        <Suspense fallback={null}>
          <CameraRig />
          <SandDunes />
          <DesertParticles />
          <DesertEffects />
        </Suspense>
      </Canvas>
    </div>
  )
}
