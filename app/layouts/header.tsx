import React from 'react'
import { Outlet, Link } from 'react-router'

function header() {
  return (
    <>
      <div>header</div>
      <Link to="series">Series</Link>
      <Link to="sets">Sets</Link>
      <Outlet />
    </>
  )
}

export default header