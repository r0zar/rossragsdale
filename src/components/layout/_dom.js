import useStore from '@/helpers/store'
import { Badge } from '@pmndrs/branding'
import Head from 'next/head'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
const Dom = ({ dom }) => {
  const events = useStore((s) => s.events)
  return (
    <div className='absolute top-0 left-0 right-0 z-20 dom' {...events}>
      <Header />
      {dom}
      <h1 className='absolute w-full text-2xl tracking-wider text-center text-white text-gray-100 md:mt-56 mt-28 top-1/2 sm:subpixel-antialiased md:antialiased'>
        Hi, I'm Ross.
      </h1>
      <p className='absolute w-full pt-3 mt-32 text-xs tracking-wider text-center text-white text-gray-100 md:mt-64 top-1/2 sm:subpixel-antialiased md:antialiased'>
        I'm a freelance web developer.
      </p>
      <p className='absolute w-full text-xs tracking-wider text-center text-white text-gray-100 md:mt-72 mt-36 top-1/2 sm:subpixel-antialiased md:antialiased'>
        I build engaging, performant, full-stack web apps.
      </p>
      <div className='absolute bottom-4 right-4 z-index-30'>
        <Badge />
      </div>
    </div>
  )
}

export default Dom
