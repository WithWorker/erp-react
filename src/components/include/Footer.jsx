import React from 'react'
import { Navbar } from 'react-bootstrap'

const Footer = () => {
    return (
    <>
        <Navbar className = "navbar navbar-expand-sm bg-light justify-content-center" fixed="bottom" bg='dark' style={{color: "white"}}>
            위드워커 Copyright &copy;2025
        </Navbar>
    </>
    )
}

export default Footer