import React from 'react'
import { Outlet } from 'react-router'

function footer() {
  return (
    <>
      <Outlet />
      <div>footer</div>
    </>
  )
}

export default footer