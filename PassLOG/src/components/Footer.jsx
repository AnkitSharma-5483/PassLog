import React from 'react'

const Footer = () => {
  return (
    <div className='flex bg-purple-950 w-full justify-between items-center px-4 h-15 sticky bottom-0'>
      <div className='logo font-bold text-white sm:text-3xl'>
        <span className='text-purple-500'>&lt;</span>
        <span>Pass</span><span className='text-purple-500'>LOG/&gt;</span>
      </div>
      <div className='flex text-white'>
        Created with love by Ankit
      </div>
    </div>
  )
}

export default Footer
