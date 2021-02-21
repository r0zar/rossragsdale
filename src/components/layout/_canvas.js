import { Canvas, useThree } from 'react-three-fiber'
import { Perf } from 'r3f-perf'
import useStore from '@/helpers/store'
import { Preload } from '@react-three/drei'
import { animated, useSpring, config } from '@react-spring/three'
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import { useEffect, useRef } from 'react'

// enable shader editor
// import { MaterialEditor, useEditorComposer } from '@three-material-editor/react'

const Bg = () => {
  const background = useControls('Background', {
    color: { r: 0, b: 0, g: 0, a: 0.5 },
  })
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
      orthographic={true}
      pixelRatio={[1, 2]}
      onCreated={({ events }) => {
        useStore.setState({ events })
      }}
    >
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
  const { setDefaultCamera } = useThree()
  const ref = useRef()
  const y = useStore((s) => s.cameraRotationY)
  const controls = useControls('Camera', {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    zoom: 250,
  })
  const props = useSpring({
    config: config.molasses,
    rotation: [0, y, 0],
  })

  useEffect(() => {
    setDefaultCamera(ref.current)
  }, [setDefaultCamera])

  return (
    <animated.orthographicCamera
      ref={ref}
      far={15}
      position={controls.position}
      {...props}
      zoom={controls.zoom}
    />
  )
}

export default LCanvas
