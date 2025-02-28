import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Outlet } from 'react-router'
import Footer from '~/components/Footer'

function footer() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default footer