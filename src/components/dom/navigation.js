import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className='absolute text-xs right-4 top-4 xl:text-xl'>
      <Link href='https://blog.rossragsdale.com'>
        <button className='relative z-20 p-2 m-2 text-white focus:outline-none focus:ring'>
          Blog
        </button>
      </Link>
      <Link href='https://calendly.com/point-blank-dev'>
        <button className='relative z-20 p-2 m-2 text-white focus:outline-none focus:ring'>
          Book a Meeting
        </button>
      </Link>
      <Link href='https://pointblankdev.com'>
        <button className='relative z-20 p-2 m-2 text-white focus:outline-none focus:ring'>
          Point Blank Dev
        </button>
      </Link>
    </nav>
  )
}

export default Navigation
