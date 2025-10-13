'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OreModel() {
  const { scene } = useGLTF('/copper_ore/scene.gltf')
  const meshRef = useRef<THREE.Group>(null)

  // Animate rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} scale={[2.5, 2.5, 2.5]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function Ore3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
      >
        {/* Increased ambient light for overall brightness */}
        <ambientLight intensity={1.2} />
        
        {/* Main directional light from top right */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        {/* Additional lights from left top side */}
        <directionalLight position={[-8, 12, 6]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-6, 8, 4]} intensity={0.7} color="#f0f8ff" />
        <pointLight position={[-10, 10, 2]} intensity={0.6} color="#ffffff" />
        
        {/* Fill light from bottom for better detail visibility */}
        <pointLight position={[-10, -10, -5]} intensity={0.4} />
        <OreModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/copper_ore/scene.gltf')
