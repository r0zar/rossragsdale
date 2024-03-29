import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect, Children } from 'react'
import Header from '../config'
import dynamic from 'next/dynamic'
import Dom from '@/components/layout/_dom'
import '@/styles/index.css'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/layout/_canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/layout/_canvas').default
}

function SplitApp({ canvas, dom }) {
  return (
    <>
      <Header />
      {dom && <Dom dom={dom} />}
      <LCanvas>{canvas && <group>{canvas}</group>}</LCanvas>
    </>
  )
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  let r3fArr = []
  let compArr = []
  Children.forEach(Component().props.children, (child) => {
    if (child.props && child.props.r3f) {
      r3fArr.push(child)
    } else {
      compArr.push(child)
    }
  })

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return (
    <>
      {r3fArr.length > 0 ? (
        <SplitApp canvas={r3fArr} dom={compArr} {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
      <script
        async
        src='https://tag.clearbitscripts.com/v1/pk_70fd662a3f4bdc78e362dc0d76f1e234/tags.js'
        referrerpolicy='strict-origin-when-cross-origin'
      />
      <head>
        <meta
          name='facebook-domain-verification'
          content='kjdeebndtr5va70hvr1ixydlc198d6'
        />
      </head>
    </>
  )
}

export default MyApp
