import React from 'react'
import { Link } from 'react-router'

interface ButtonProps {
    routeLink: string;
    textButton: string;
}

function Button( {routeLink, textButton}: ButtonProps) {
  return (
    <Link 
        to={`${routeLink}`} 
        className=' hover:bg-white text-white hover:text-primary font-bold py-2 px-4 rounded-2xl border-2 w-[70%] mx-auto'
    >

    {textButton}

    </Link>
  )
}

export default Button