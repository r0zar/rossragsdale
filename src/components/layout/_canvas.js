import { Canvas } from 'react-three-fiber'
import { Perf } from 'r3f-perf'
import useStore from '@/helpers/store'
import { OrbitControls, OrthographicCamera, Preload } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'

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
      gl={{
        powerPreference: 'high-performance',
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
      pixelRatio={[1, 2]}
      onCreated={({ events }) => {
        useStore.setState({ events })
      }}
    >
      {/* <OrbitControls /> */}
      <Leva hidden={true} />
      <SelectionControls />
      <Preload all />
      <Bg />
      <Perf openByDefault trackGPU={true} position={'bottom-right'} />
      {/* <MaterialEditor /> */}
      {/* <EffectComposer ref={useEditorComposer()}> */}

      <EffectComposer>
        {/* <Noise opacity={0.04} /> */}
        <Glitch
          delay={[2, 18]} // min and max glitch delay
          duration={[0.3, 1.0]} // min and max glitch duration
          strength={[0.3, 1.0]} // min and max glitch strength
          active
        />
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={3.3}
          height={300}
          opacity={0.8}
        />
        <Noise opacity={0.015} />
        <Vignette eskil={false} offset={0.2} darkness={1.1} />
      </EffectComposer>
      {children}
      {/* <fog attach='fog' args={['black', 0, 30]} /> */}
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
