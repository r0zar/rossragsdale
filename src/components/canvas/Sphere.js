import { Suspense } from 'react'
import { Environment, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import useStore from '@/helpers/store'
import { useControls } from 'leva'

const M = a(MeshDistortMaterial)

const SphereComponent = () => {
  const router = useStore((s) => s.router)
  const { color } = useSpring({
    color: router.route === '/box' ? '#272727' : 'black',
  })
  const sphere = useControls('Sphere', {
    args: [1, 32, 32],
    position: [0, 0, -10],
  })
  return (
    <Suspense fallback={null}>
      <Sphere
        args={sphere.args}
        position={sphere.position}
        onClick={() => router.push('https://twitter.com/lordrozar')}
      >
        <M factor={2} color={color} />
      </Sphere>
    </Suspense>
  )
}

export default SphereComponent
