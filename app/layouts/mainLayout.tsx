import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import Header from './header'

function mainLayout() {
  return (
    <>
        <Header />
          <div className="flex-grow">
            <Outlet />
          </div>
        <Footer />
    </>
  )
}

export default mainLayout