import useStore from '@/helpers/store'
import Head from 'next/head'
import Navigation from '@/components/dom/navigation'
import Greeting from '@/components/dom/greeting'
import Controls from '@/components/dom/controls'

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
      <Navigation />
      <Greeting />
      <Controls />
      {dom}
    </div>
  )
}

export default Dom
