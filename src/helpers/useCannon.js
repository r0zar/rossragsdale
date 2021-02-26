import * as CANNON from 'cannon'
import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import _ from 'lodash'
import * as THREE from 'three/src/Three'

// Cannon-world context provider
const context = React.createContext()
export function Provider({ children }) {
  // Set up physics
  const [world] = useState(() => new CANNON.World())
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 10
    world.gravity.set(0, -25, 0)
  }, [world])

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return <context.Provider value={world} children={children} />
}

// Custom hook to maintain a world physics body
export function useCannon({ ...props }, fn, deps = []) {
  const ref = useRef()
  // Get cannon world object
  const world = useContext(context)
  // Instanciate a physics body
  const [body] = useState(() => new CANNON.Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world.addBody(body)
    // Remove body on unmount
    return () => world.removeBody(body)
  }, deps)

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.copy(body.position)
      ref.current.quaternion.copy(body.quaternion)
    }
  })

  return ref
}

// Custom hook to maintain a world physics body
export function Rain() {
  const group = useRef()
  // Get cannon world object
  const world = useContext(context)
  // console.log(ref.current.children)
  const [geo, mat, points] = useMemo(() => {
    const points = _.times(1000, () => new CANNON.Body({ mass: 1 }))
    const geo = new THREE.SphereBufferGeometry(1.01, 10, 10)
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#131313'),
    })
    points.forEach((p) => {
      // Instanciate a physics body
      p.addShape(new CANNON.Sphere(new CANNON.Vec3(1, 1, 1)))
      p.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      )
      // Add body to world on mount
      world.addBody(p)
    })
    return [geo, mat, points]
  }, [world])

  useFrame(() => {
    if (group.current) {
      // console.log(group.current.children[0].position)
      group.current.children.forEach((p, i) => {
        // Transport cannon physics into the referenced threejs object
        if (points[i].position.y < -50) {
          points[i].position.y = 50
          points[i].velocity = new CANNON.Vec3(0, 0, 0)
        }
        p.position.copy(points[i].position)
        p.quaternion.copy(points[i].quaternion)
      })
    }
  })

  return (
    <group ref={group}>
      {points.map((a, i) => (
        <mesh key={i} geometry={geo} material={mat} />
      ))}
    </group>
  )
}
