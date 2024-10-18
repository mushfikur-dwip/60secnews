import React from 'react'
import menu from '../assets/menu.png'
import logo from '../assets/logo.png'

function Header() {
  return (
    <div className="flex justify-between items-center p-3 border-b-2">
          <img src={menu} alt="menu-icon" className='size-8 cursor-pointer' onClick={()=>{}} />
          <img src={logo} alt="logo" className='w-[120px]'/>
    </div>
  )
}

export default Header
