import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Environment, useGLTF, useHelper, useProgress } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useControls } from 'leva'
import { useFrame } from 'react-three-fiber'
import { animated, config, useSpring } from '@react-spring/three'
// import { SpotLightHelper } from 'three'

function nearestPow2(aSize) {
  return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)))
}

const RozarComponent = () => {
  return (
    <Suspense fallback={null}>
      <Logo />
    </Suspense>
  )
}

const Logo = () => {
  const router = useStore((s) => s.router)
  const spotLight1 = useRef()
  const spotLight3 = useRef()
  const logo = useRef()
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()
  const mesh4 = useRef()
  const mesh5 = useRef()
  const { nodes, materials } = useGLTF('rozar.glb', true)
  const mesh = useControls('Rozar', {
    position: [-10, -0.6, 0.4],
    rotation: [Math.PI / 2, 0, -Math.PI / 2],
    scale: [0.75, 0.75, 0.75],
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

  const [ready, setReady] = useState(false)
  const playerOptions = useRef({
    playing: false,
    pausedAt: 0,
    playedAt: 0,
  })
  const [num, setNum] = useState(16)
  const [track, setTrack] = useState('Chapter III')
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  )
  const analyser = useRef(audioContext.current.createAnalyser())
  const currentSource = useRef(null)
  const currentBuffer = useRef(null)

  useEffect(() => {
    analyser.current.fftSize = nearestPow2(num) * 2
    analyser.current.maxDecibels = 0
  }, [num])

  useEffect(() => {
    fetch(track + '.mp3').then((res) => {
      res.arrayBuffer().then((value) => {
        audioContext.current.decodeAudioData(value).then((audioBuffer) => {
          currentBuffer.current = audioBuffer
          setReady(true)
        })
      })
    })
    return () => {
      if (playerOptions.current.playing) play()
      currentBuffer.current = null
      playerOptions.current = {
        playing: false,
        pausedAt: 0,
        playedAt: 0,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track])

  const play = useCallback(() => {
    if (!playerOptions.current.playing) {
      const source = audioContext.current.createBufferSource()
      source.buffer = currentBuffer.current
      source.connect(analyser.current)
      analyser.current.connect(audioContext.current.destination)
      currentSource.current = source
      currentSource.current.start(0, playerOptions.current.pausedAt)
      playerOptions.current.playedAt =
        audioContext.current.currentTime - playerOptions.current.pausedAt
    } else {
      playerOptions.current.pausedAt =
        audioContext.current.currentTime - playerOptions.current.playedAt
      currentSource.current.stop()
    }
    return (playerOptions.current.playing = !playerOptions.current.playing)
  }, [])

  let t = 0
  useFrame((state, delta) => {
    t += delta
    logo.current.position.y = Math.sin(t) * 0.05 + mesh.position[1]
    logo.current.rotation.x = Math.cos(t / 3) * 0.02 + mesh.rotation[0]
    logo.current.rotation.y = Math.sin(t / 4) * 0.02 - 0.05 + mesh.rotation[1]
    logo.current.rotation.z = Math.sin(t) * 0.02 - 0.35 + mesh.rotation[2]
  })
  return (
    <animated.group
      ref={logo}
      scale={mesh.scale}
      rotation={mesh.rotation}
      position={mesh.position}
      onClick={() => play()}
      // onClick={() => router.push('https://soundcloud.com/rozarbeats')}
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
        ref={mesh1}
        material={materials['Material.001']}
        geometry={nodes.path449.geometry}
      />
      <mesh
        ref={mesh2}
        material={materials['Material.001']}
        geometry={nodes.path475.geometry}
      />
      <mesh
        ref={mesh3}
        material={materials['Material.001']}
        geometry={nodes.path501.geometry}
      />
      <mesh
        ref={mesh4}
        material={materials['Material.001']}
        geometry={nodes.path527.geometry}
      />
      <mesh
        ref={mesh5}
        material={materials['Material.001']}
        geometry={nodes.path553.geometry}
      />
    </animated.group>
  )
}
export default RozarComponent
