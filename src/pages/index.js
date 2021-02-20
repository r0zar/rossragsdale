import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Navigation from '@/components/dom/navigation'

const BlogPost = dynamic(() => import('@/components/canvas/BlogPost'), {
  ssr: false,
})
const Sphere = dynamic(() => import('@/components/canvas/Sphere'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'rossragsdale.com' })
  return (
    <>
      <Navigation />
      <Sphere r3f />
      <BlogPost r3f />
    </>
  )
}

export default Page
