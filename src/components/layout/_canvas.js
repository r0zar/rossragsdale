import { Canvas } from 'react-three-fiber'
import { Perf } from 'r3f-perf'
import useStore from '@/helpers/store'
import { OrbitControls, OrthographicCamera, Preload } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'

// enable shader editor
// import { MaterialEditor, useEditorComposer } from '@three-material-editor/react'

const Bg = () => {
  const background = useControls({ color: { r: 0, b: 0, g: 0, a: 0.5 } })
  const bg = useSpring({
    ...background.color,
  })
  return <animated.color attach='background' r={bg.r} g={bg.g} b={bg.b} />
}
const LCanvas = ({ children }) => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={({ events }) => {
        useStore.setState({ events })
      }}
    >
      {/* <OrbitControls /> */}
      <SelectionControls />
      <Preload all />
      <Bg />
      <Perf openByDefault trackGPU={true} position={'bottom-right'} />
      {/* <MaterialEditor /> */}
      {/* <EffectComposer ref={useEditorComposer()}> */}
      <EffectComposer>
        <Vignette eskil={false} offset={0.2} darkness={1.1} />
      </EffectComposer>
      {children}
    </Canvas>
  )
}

const SelectionControls = () => {
  const camera = useControls('Camera', {
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    zoom: 250,
  })
  return (
    <OrthographicCamera
      makeDefault
      near={0}
      far={15}
      position={camera.position}
      rotation={camera.rotation}
      zoom={camera.zoom}
    />
  )
}

export default LCanvas
