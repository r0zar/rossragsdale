import { useSpring, animated } from 'react-spring'
import useStore from '@/helpers/store'
import { useEffect, useState } from 'react'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      // Add event listener
      window.addEventListener('resize', handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

const Controls = () => {
  const store = useStore()
  const windowSize = useWindowSize()
  console.log(windowSize)
  const props = useSpring({
    top: windowSize.height / 2,
    opacity: 1,
    color: '#282828',
    from: { opacity: 0, color: 'black' },
  })
  return (
    <nav className='text-6xl cursor-pointer select-none'>
      <animated.i
        className='fixed left-10'
        style={props}
        onClick={() => {
          useStore.setState({
            cameraRotationY: (store.cameraRotationY += Math.PI / 2),
          })
        }}
      >
        «
      </animated.i>
      <animated.i
        className='fixed right-10'
        style={props}
        onClick={() => {
          useStore.setState({
            cameraRotationY: (store.cameraRotationY -= Math.PI / 2),
          })
        }}
      >
        »
      </animated.i>
    </nav>
  )
}

export default Controls
