import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import Header from './header'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
function mainLayout() {
  
  return (
    <>
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default mainLayout