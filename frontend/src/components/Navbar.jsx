import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {

    const [visible, setVisible] = useState(false)

  return (
    <nav className='flex justify-between items-center py-5 font-medium'>
        <Link to='/'>
            <img src={assets.logo} alt="logo" className='w-36' />
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to='/collection' className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to='/about' className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to='/contact' className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />
            <div className='group relative'>
                <img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700'>
                        <p className="cursor-pointer hover:text-black">My Profile</p>
                        <p className="cursor-pointer hover:text-black">Orders</p>
                        <p className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5 cursor-pointer' />
                <p className='absolute right-[-5px] bottom-[-5px] bg-black text-center text-white text-[8px] aspect-square leading-4 rounded-full w-4 h-4 flex items-center justify-center'>10</p>
            </Link>
            <img onClick={() => setVisible(!visible)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
        </div>
        { /* Sidebar Menu for smaller screens */ }
        <div className={`mobile-menu absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setVisible(!visible)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} alt="dropdown" className='h-4 rotate-180' />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setVisible(!visible)} className="py-2 pl-6 border-b" to='/'>HOME</NavLink>
                <NavLink onClick={() => setVisible(!visible)} className="py-2 pl-6 border-b" to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={() => setVisible(!visible)} className="py-2 pl-6 border-b" to='/about'>ABOUT</NavLink>
                <NavLink onClick={() => setVisible(!visible)} className="py-2 pl-6 border-b" to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar