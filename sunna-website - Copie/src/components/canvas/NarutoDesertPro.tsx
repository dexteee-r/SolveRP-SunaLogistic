'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Dunes() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const geo = mesh.current.geometry
    const pos = geo.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)

      const wave =
        Math.sin(x * 0.2 + t * 0.6) * 1.2 +
        Math.cos(y * 0.2 + t * 0.4) * 0.7

      pos.setZ(i, wave)
    }

    pos.needsUpdate = true
    mesh.current.position.z = (t * 2) % 40
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200, 300, 300]} />
      <meshToonMaterial color="#e4a75a" />
    </mesh>
  )
}

function SandParticles() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const arr = new Float32Array(3000)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 200
    }
    return arr
  }, [])

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#f7d6a3" size={0.5} />
    </points>
  )
}

function Sun() {
  return (
    <mesh position={[0, 30, -80]}>
      <sphereGeometry args={[12, 32, 32]} />
      <meshBasicMaterial color="#ffb347" />
    </mesh>
  )
}

function CameraMotion() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.1) * 2
    state.camera.position.y = 10 + Math.sin(t * 0.3) * 0.5
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default function NarutoDesertPro() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 10, 25], fov: 60 }}>
        <color attach="background" args={['#f7c98b']} />
        <fog attach="fog" args={['#f7c98b', 20, 120]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />

        <CameraMotion />
        <Sun />
        <Dunes />
        <SandParticles />
      </Canvas>
    </div>
  )
}
