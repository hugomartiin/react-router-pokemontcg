import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router'

function header() {
  let windowWidth = window.innerWidth;

  useEffect(() => {
    console.log(windowWidth);
    
      // document.getElementById("navbarRoutes")?.classList.toggle("hidden");

      document.body.style.overflow = 'unset';
  }
  , [window.innerWidth]);

  return (
    <>
      <header>
        <nav className=" bg-red-500 p-6 flex flex-col md:flex-row items-center justify-around gap-8">	
          <div className="logoContainer w-[50%] md:w-[15%]">
            <Link to={'/'} className=""><img src="img/logo.png" alt="logo_pokemon" className='max-w-full mx-auto'/></Link>
          </div>
          <div id='navbarRoutes' className='flex flex-col md:flex-row items-center justify-around w-[50%] gap-4 text-white text-2xl font-bold'>
            <Link to={'/series'} className="">Series</Link>
            <Link to={'/sets'} className="">Sets</Link>
            <Link to={'/favourites'} className="">Favourites</Link>
            <Link to={'/cards'} className="">Search</Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default header