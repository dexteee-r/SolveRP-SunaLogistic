'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '@/providers/SmoothScrollProvider'
import { duneVertexShader, duneFragmentShader } from '@/shaders/desert'

export default function SandDunes() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const mat = mesh.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = clock.getElapsedTime()
    mat.uniforms.uScrollProgress.value = scrollState.progress
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, -5]}
    >
      <planeGeometry args={[120, 120, 300, 300]} />
      <shaderMaterial
        vertexShader={duneVertexShader}
        fragmentShader={duneFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
