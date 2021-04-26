import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "./navbar.png"

const TopNav = ({ handleLogout}) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    
	return (
		<Navbar expand="md">
			<Navbar.Brand href="/" className="navbar">
                <img
                    alt=""
                    src={ Logo }
                    width="80"
                    height="80"
                    className="d-inline-block"
                /> {' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="menu" />
            <Navbar.Collapse id="menu">
                <React.Fragment>
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>
                </Nav>
                <Nav className="justify-content-end">
                    {
                        "userData" in localStorage && userData.user.isAdmin === false ?
                        <React.Fragment>
                            <Link to="/myorder" className="nav-link" >My Orders</Link>
                            <Link to="/cart" className="nav-link" >My Cart</Link>
                            <Link to="/" className="nav-link" onClick={() => handleLogout()} >Logout</Link>
                        </React.Fragment>
                    :
                        userData !== null && userData.user.isAdmin === true ?
                        <React.Fragment>
                            <Link to="/addItems" className="nav-link">Add Items</Link>
                            <Link to="/" className="nav-link" onClick={() => handleLogout()} >Logout</Link>
                        </React.Fragment>
                    :
                    <React.Fragment>
                        <Link to="/login" className="nav-link" >Login</Link>
                        <Link to="/register" className="nav-link" >Register</Link>
                    </React.Fragment>
                    }
                </Nav>
                </React.Fragment>
            </Navbar.Collapse>
		</Navbar>
	)
}

export default TopNav