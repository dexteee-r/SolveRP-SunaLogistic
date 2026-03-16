'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import * as THREE from 'three'
import { desertPostFragmentShader, postVertexShader } from '@/shaders/desert'

const DesertPostShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: postVertexShader,
  fragmentShader: desertPostFragmentShader,
}

export default function DesertEffects() {
  const { gl, scene, camera, size } = useThree()
  const composerRef = useRef<EffectComposer | null>(null)
  const filmPassRef = useRef<ShaderPass | null>(null)

  useEffect(() => {
    const composer = new EffectComposer(gl)

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.3,  // strength
      0.8,  // radius
      0.5   // threshold
    )
    composer.addPass(bloomPass)

    const filmPass = new ShaderPass(DesertPostShader)
    composer.addPass(filmPass)
    filmPassRef.current = filmPass

    composerRef.current = composer

    return () => {
      composer.dispose()
    }
  }, [gl, scene, camera, size])

  // Handle resize
  useEffect(() => {
    composerRef.current?.setSize(size.width, size.height)
  }, [size])

  useFrame(({ clock }) => {
    if (filmPassRef.current) {
      filmPassRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    composerRef.current?.render()
  }, 1)

  return null
}
