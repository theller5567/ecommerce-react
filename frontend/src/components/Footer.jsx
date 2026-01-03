import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='py-10'>
        <div className='flex justify-between items-center'>
            <div className='w-1/2'>
                <img src={assets.logo} alt="logo" className='w-36' />
            </div>
        </div>
    </footer>
  )
}

export default Footer