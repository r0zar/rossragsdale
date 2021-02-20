import useStore from '@/helpers/store'
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
      <h1 className='absolute w-full text-2xl tracking-wider text-center text-white md:mt-56 mt-28 top-1/2 sm:subpixel-antialiased md:antialiased'>
        Hi, I'm Ross.
      </h1>
      <div className='absolute w-full text-xs tracking-wider text-center text-gray-100 mt-36 md:mt-72 top-1/2 sm:subpixel-antialiased md:antialiased'>
        <p>I'm a freelance web developer.</p>
        <p>I build engaging, performant, full-stack web apps.</p>
      </div>
    </div>
  )
}

export default Dom
