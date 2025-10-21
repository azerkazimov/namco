'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function MetalOreModel({ isHovered }: { isHovered: boolean }) {
  const { scene } = useGLTF('/metal_ore/scene.gltf')
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

    const targetSize = 2.5
    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const scale = targetSize / maxAxis
    cloned.scale.setScalar(scale)

    return cloned
  }, [scene])

  // Animate rotation + subtle float with hover effects
  useFrame((state) => {
    const group = meshRef.current
    if (!group) return
    
    // Smooth rotation
    group.rotation.y += isHovered ? 0.02 : 0.01
    
    // Floating animation with hover enhancement
    const floatIntensity = isHovered ? 0.2 : 0.1
    group.position.y = Math.sin(state.clock.elapsedTime * 0.8) * floatIntensity
    
    // Scale effect on hover
    const targetScale = isHovered ? 1.05 : 1.0
    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group ref={meshRef}>
      <primitive object={centeredScene} />
    </group>
  )
}

export default function MetalOre3D() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="w-full h-96 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 opacity-80" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.3),transparent_50%)]" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 2, 
          outputColorSpace: THREE.SRGBColorSpace,
          antialias: true,
          alpha: true
        }}
        className="w-full h-full relative z-10"
        style={{ background: 'transparent' }}
      >
        {/* Enhanced lighting setup for better visibility */}
        <ambientLight intensity={1.5} />
        <hemisphereLight intensity={0.8} color={0xffffff} groundColor={0x404040} />
        
        {/* Main directional light from top right */}
        <directionalLight position={[5, 5, 5]} intensity={3.0} color="#ffffff" />
        
        {/* Additional directional light from left */}
        <directionalLight position={[-5, 5, 5]} intensity={2.0} color="#ffffff" />
        
        {/* Point lights for better illumination */}
        <pointLight position={[3, 3, 3]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3, 3, 3]} intensity={2.0} color="#ffffff" />
        
        {/* Fill light from front */}
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#ffffff" />
        
        {/* Environment for realistic reflections */}
        <Environment preset="warehouse" />
        
        {/* Ground plane for better context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial 
            color="#475569" 
            roughness={0.8} 
            metalness={0.1}
            transparent
            opacity={0.3}
          />
        </mesh>
        
        <MetalOreModel isHovered={isHovered} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Hover indicator */}
      {isHovered && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300">
          <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}

// Preload the model
useGLTF.preload('/metal_ore/scene.gltf')
