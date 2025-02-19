import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {

return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home">WithWorker</Navbar.Brand>
            <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className='nav-link'>로그인</Link>
            </Nav>
        </Container>
        </Navbar>    
    </>
    )
}

export default Header