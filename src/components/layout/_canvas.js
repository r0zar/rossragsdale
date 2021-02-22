import { Canvas, useThree } from 'react-three-fiber'
import { Perf } from 'r3f-perf'
import useStore from '@/helpers/store'
import { Effects, Html, OrthographicCamera, Preload } from '@react-three/drei'
import { animated, useSpring, config } from '@react-spring/three'
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  SMAA,
  Vignette,
} from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import { Suspense, useEffect, useRef } from 'react'
import { MaterialEditor, useEditorComposer } from '@three-material-editor/react'

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
      camera={{ position: [0, 0, 0], zoom: 250 }}
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
      <Perf trackGPU={true} position={'bottom-right'} />
      {children}
      <fog attach='fog' args={['green', 0, 600]} />
    </Canvas>
  )
}

const SelectionControls = () => {
  const { camera, setDefaultCamera } = useThree()
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
    <>
      {ref.current && (
        <EffectComposer>
          <Glitch
            delay={[2, 18]}
            duration={[0.3, 1.0]}
            strength={[0.3, 1.0]}
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
      )}
      <animated.orthographicCamera
        ref={ref}
        far={15}
        position={controls.position}
        {...props}
        zoom={controls.zoom}
      />
    </>
  )
}

export default LCanvas
