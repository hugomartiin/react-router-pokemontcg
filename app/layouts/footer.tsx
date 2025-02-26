import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/components/Footer'

function footer() {
  return (
    <>
      <Outlet />
      <footer className='bg-primary p-6'>
        <h2 className="text-center text-4xl text-white font-medium">&#169; By Hugo and Aitor</h2>
      </footer>
    </>
  )
}

export default footer