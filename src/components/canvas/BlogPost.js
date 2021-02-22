import { Suspense, useEffect, useState } from 'react'
import { Environment, Text } from '@react-three/drei'
import useStore from '@/helpers/store'
import GhostContentAPI from '@tryghost/content-api'
import { useControls } from 'leva'

const api = new GhostContentAPI({
  url: 'https://blog.rossragsdale.com',
  key: 'b17cb2756c8fc3ec3c0e718842',
  version: 'v3',
})

const BlogPostComponent = () => {
  const [post, setPost] = useState({})
  useEffect(() => {
    api.posts
      .browse({ limit: 1, include: 'tags,authors' })
      .then((posts) => {
        setPost(posts[0])
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  const router = useStore((s) => s.router)
  const mesh = useControls('Blog Post', {
    position: [10, 0.1, 0],
    rotation: [0, Math.PI / -2, 0],
    maxWidth: 2.5,
  })
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <mesh
        position={mesh.position}
        rotation={mesh.rotation}
        onClick={() => {
          router.push(post.url)
        }}
      >
        <Text
          depthOffset={1}
          textAlign='center'
          maxWidth={mesh.maxWidth}
          position={[0, 0, 0.03]}
          color='#575757'
          fontSize={0.18}
        >
          {post.title}
        </Text>
        <Text
          maxWidth={mesh.maxWidth}
          textAlign='center'
          position={[0, -0.6, 0]}
          color='#373737'
          fontSize={0.1}
        >
          {post.excerpt}
        </Text>
      </mesh>
      <Environment preset={'studio'} />
    </Suspense>
  )
}
export default BlogPostComponent
