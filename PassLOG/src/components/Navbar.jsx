import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-950 w-full justify-between items-center px-4 h-15 py-2 sm:py-0'>
      <div className='flex justify-between'>
        <div className='logo font-bold text-white sm:text-5xl text-3xl'>
          <span className='text-purple-500'>&lt;</span>
          <span>Pass</span><span className='text-purple-500'>LOG/&gt;</span>
        </div>
        <button className='cursor-pointer text-white m-2 bg-purple-800 flex gap-1 rounded-xl justify-center items-center ring-white ring-1'>
          <img className='invert p-0.5 sm:w-11' src="/icons/github.svg" alt="github logo"/>
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
