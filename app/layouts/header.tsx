import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router'
import logo from '/img/logo.png'

function Header() {

  return (
    <>
      <header>
        <nav className=" bg-primary p-6 flex flex-col md:flex-row items-center justify-around gap-8">	
          <div className="logoContainer w-[50%] md:w-[10%]">
            <Link to={'/'} className=""><img src={logo} alt="logo_pokemon" className='max-w-full mx-auto'/></Link>
          </div>
          <div id='navbarRoutes' className='flex flex-col md:flex-row items-center justify-around w-[50%] gap-4 text-white text-2xl font-bold'>
            <Link to={'/series'} className="">Series</Link>
            <Link to={'/sets'} className="">Sets</Link>
            <Link to={'/favourites'} className="">Favourites</Link>
            <Link to={'/filters'} className="">Search</Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header