import { Suspense, useRef, forwardRef } from 'react'
import { Environment, useGLTF, useHelper } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useControls } from 'leva'
import { Object3D, SpotLightHelper, Vector3 } from 'three'
import { useFrame } from 'react-three-fiber'

const PointBlankDevComponent = () => {
  // console.log(logo.current)
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.6} />
      <Logo />
      <Environment preset={'studio'} />
    </Suspense>
  )
}

const Logo = () => {
  let t = 0
  useFrame((state, delta) => {
    t += delta
    logo.current.position.y = Math.sin(t) * 0.03
    logo.current.rotation.x = Math.PI / 2 + Math.cos(t / 3) * 0.01
    logo.current.rotation.y = Math.sin(t / 4) * 0.01
    logo.current.rotation.z = Math.PI + Math.sin(t) * 0.01
  })
  const spotLight1 = useRef()
  const spotLight2 = useRef()
  const spotLight3 = useRef()
  const logo = useRef()
  const { nodes, materials } = useGLTF('point-blank-dev.glb', true)
  const mesh = useControls('Point Blank Dev', {
    position: [0, 0, 10],
    rotation: [Math.PI / 2, 0, Math.PI],
    scale: [0.8, 0.8, 0.8],
  })
  const light1 = useControls('Light 1', {
    intensity: 0.03,
    angle: 0.22,
    position: [1.1, 9.5, -1.2],
  })
  const light2 = useControls('Light 2', {
    intensity: 0.48,
    angle: 0.46,
    position: [-0.7, 4.8, 1.6],
  })
  const light3 = useControls('Light 3', {
    intensity: 0.14,
    angle: 0.37,
    position: [-0.93, 4.98, -0.74],
  })
  // useHelper(spotLight1, SpotLightHelper, 'cyan')
  // useHelper(spotLight2, SpotLightHelper, 'orange')
  // useHelper(spotLight3, SpotLightHelper, 'green')
  return (
    <group
      ref={logo}
      scale={mesh.scale}
      rotation={mesh.rotation}
      position={mesh.position}
    >
      <spotLight
        ref={spotLight1}
        intensity={light1.intensity}
        position={light1.position}
        target={logo.current}
        angle={light1.angle}
      />
      <spotLight
        ref={spotLight2}
        intensity={light2.intensity}
        position={light2.position}
        target={logo.current}
        angle={light2.angle}
      />
      <spotLight
        ref={spotLight3}
        intensity={light3.intensity}
        position={light3.position}
        target={logo.current}
        angle={light3.angle}
      />
      <mesh
        material={materials['SVGMat.001']}
        geometry={nodes.Curve1.geometry}
      />
      <mesh
        material={materials['SVGMat.001']}
        geometry={nodes.Curve2.geometry}
      />
      <mesh
        material={materials['SVGMat.001']}
        geometry={nodes.Curve3.geometry}
      />
      <mesh
        material={materials['SVGMat.001']}
        geometry={nodes.Curve4.geometry}
      />
    </group>
  )
}
export default PointBlankDevComponent
