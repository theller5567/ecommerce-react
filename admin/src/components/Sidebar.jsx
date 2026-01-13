import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add_icon} alt="add" />
                <p className='hidden sm:block'>Add Products</p>
            </NavLink>
            <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.list_icon} alt="list" />
                <p className='hidden sm:block'>List Products</p>
            </NavLink>
            <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="orders" />
                <p className='hidden sm:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar