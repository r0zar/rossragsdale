import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const BlogPost = dynamic(() => import('@/components/canvas/BlogPost'), {
  ssr: false,
})
const Sphere = dynamic(() => import('@/components/canvas/Sphere'), {
  ssr: false,
})
const PointBlankDev = dynamic(
  () => import('@/components/canvas/PointBlankDev'),
  {
    ssr: false,
  }
)
const Rozar = dynamic(() => import('@/components/canvas/Rozar'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'rossragsdale.com' })
  return (
    <>
      <Sphere r3f />
      <BlogPost r3f />
      <PointBlankDev r3f />
      <Rozar r3f />
    </>
  )
}

export default Page
