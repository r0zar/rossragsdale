import { Suspense, useEffect, useRef } from 'react'
import { Environment, useGLTF, useHelper, useProgress } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useControls } from 'leva'
import { useFrame } from 'react-three-fiber'
// import { SpotLightHelper } from 'three'

const RozarComponent = () => {
  return (
    <Suspense fallback={null}>
      <Logo />
    </Suspense>
  )
}

const Logo = () => {
  const router = useStore((s) => s.router)
  let t = 0
  useFrame((state, delta) => {
    t += delta
    logo.current.position.y = Math.sin(t) * 0.05
    logo.current.rotation.x = Math.cos(t / 3) * 0.02 + Math.PI / 2
    logo.current.rotation.y = Math.sin(t / 4) * 0.02 - 0.05
    logo.current.rotation.z = Math.sin(t) * 0.02 - Math.PI / 2 - 0.35
  })
  const spotLight1 = useRef()
  const spotLight3 = useRef()
  const logo = useRef()
  const { nodes, materials } = useGLTF('rozar.glb', true)
  const mesh = useControls('Rozar', {
    position: [-10, 0, 0.4],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.8, 0.8, 0.8],
  })
  const light1 = useControls('Light R1', {
    intensity: 0.21,
    angle: 0.54,
    position: [3.63, 17.58, -0.08],
  })
  const light3 = useControls('Light R3', {
    intensity: 8.13,
    angle: 0.62,
    position: [5.2, 10.71, 0.21],
  })
  // useHelper(spotLight1, SpotLightHelper, 'cyan')
  // useHelper(spotLight3, SpotLightHelper, 'green')
  return (
    <group
      ref={logo}
      scale={mesh.scale}
      rotation={mesh.rotation}
      position={mesh.position}
      onClick={() => router.push('https://soundcloud.com/rozarbeats')}
    >
      <spotLight
        ref={spotLight1}
        intensity={light1.intensity}
        position={light1.position}
        target={logo.current}
        angle={light1.angle}
      />
      <spotLight
        ref={spotLight3}
        intensity={light3.intensity}
        position={light3.position}
        target={logo.current}
        angle={light3.angle}
      />
      <mesh
        material={materials['Material.001']}
        geometry={nodes.path449.geometry}
      />
      <mesh
        material={materials['Material.001']}
        geometry={nodes.path475.geometry}
      />
      <mesh
        material={materials['Material.001']}
        geometry={nodes.path501.geometry}
      />
      <mesh
        material={materials['Material.001']}
        geometry={nodes.path527.geometry}
      />
      <mesh
        material={materials['Material.001']}
        geometry={nodes.path553.geometry}
      />
    </group>
  )
}
export default RozarComponent
