import { useWindowHeight } from '@react-hook/window-size'
import { useSpring, animated } from 'react-spring'
import useStore from '@/helpers/store'

const Controls = () => {
  const store = useStore()
  const height = useWindowHeight()
  const props = useSpring({
    top: height / 2,
    opacity: 1,
    color: '#282828',
    from: { opacity: 0, color: 'black' },
  })
  return (
    <nav className='cursor-pointer'>
      <animated.i
        className='fixed text-5xl left-10'
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
        className='fixed text-5xl right-10'
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
