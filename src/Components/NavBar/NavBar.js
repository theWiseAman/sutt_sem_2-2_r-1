import React from 'react';
import { Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import "./NavBar.scss";

const NavBar = ({user}) => {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/")
    };

    return (
        <Navbar className='p-3' bg="dark" variant="dark">
            <NavbarBrand className='col-3' href="/home">
                NavBar
            </NavbarBrand>
            <Nav className='col-md-9'>
                <Link className='offset-4 col-md-1 text-light navLink' to="/services">Services</Link>
                <Link className='col-md-1 text-light navLink' to="/clients">Clients</Link>
                <Link className='col-md-1 text-light navLink' to="/aboutUs">About Us</Link>
                <Link className='col-md-1 text-light navLink' to="/contactUs">Contact Us</Link>
                {
                    localStorage.getItem("user-info") ?
                    <>
                        <Link className='col-1 text-light navLink' to="/home">Dashboard</Link>
                        <Nav>
                            <NavDropdown title={user && user.responses.user.name}>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </> :
                    <>
                        <Link className='col-1 text-light navLink' to="/">Login</Link>
                        <Link className='col-1 text-light navLink' to="/">Register</Link>
                    </>
                }
            </Nav>
        </Navbar>
    )
}

export default NavBar;
