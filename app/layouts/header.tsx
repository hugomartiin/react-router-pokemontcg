import React from 'react'
import { Outlet } from 'react-router'

function header() {
  return (
    <>
      <div>header</div>
      <Outlet />
    </>
  )
}

export default header