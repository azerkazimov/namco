'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OreModel() {
  const { scene } = useGLTF('/copper_ore/scene.gltf')
  const meshRef = useRef<THREE.Group>(null)

  // Center and scale model to a target size using bounding box
  const centeredScene = useMemo(() => {
    const cloned = scene.clone(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    cloned.position.sub(center) // center at origin

    const targetSize = 2.5 // roughly fit viewport height
    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const scale = targetSize / maxAxis
    cloned.scale.setScalar(scale)

    return cloned
  }, [scene])

  // Animate rotation + subtle float
  useFrame((state) => {
    const group = meshRef.current
    if (!group) return
    group.rotation.y += 0.01
    group.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
  })

  return (
    <group ref={meshRef}>
      <primitive object={centeredScene} />
    </group>
  )
}

export default function Ore3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 2, outputColorSpace: THREE.SRGBColorSpace }}
        className="w-full h-full"
      >
        {/* Global illumination and fill lights */}
        <ambientLight intensity={2.4} />
        <hemisphereLight intensity={1} color={0xffffff} groundColor={0x404040} />
        
        {/* Main directional light from top right */}
        <directionalLight position={[10, 10, 5]} intensity={2.2} />
        
        {/* Additional lights from left top side */}
        <directionalLight position={[-8, 12, 6]} intensity={1.9} color="#ffffff" />
        <pointLight position={[-6, 8, 4]} intensity={2.0} color="#f0f8ff" />
        <pointLight position={[-10, 10, 2]} intensity={1.8} color="#ffffff" />
        
        {/* Fill light from bottom for better detail visibility */}
        <pointLight position={[-10, -10, -5]} intensity={0.9} />
        <OreModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/copper_ore/scene.gltf')
