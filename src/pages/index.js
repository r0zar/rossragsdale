import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
import Go from '@/components/dom/go'

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
      <Sphere r3f />
      <BlogPost r3f />
      {/* <Go /> */}
    </>
  )
}

export default Page
