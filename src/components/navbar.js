
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BsFillCartFill as IconCart } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';


import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';


// component function
export default function NavBar(){
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)


    // code for log out
    function logOut(event){
        event.preventDefault();
        setUser(null);
        localStorage.removeItem("token");
        navigate('/')
    }

    return(
        <>
            
            <Navbar bg="dark" variant='dark' >
                    <Container>
                         <Navbar.Brand  as = {NavLink} to="/">
                            Brand Name
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto ">
                                {!user && 
                                    <>
                                    <Nav.Link as = {NavLink} to="/login">Login</Nav.Link>
                                    <Nav.Link  as = {NavLink} to="/signup">Signup</Nav.Link>
                                    </>
                                }
                                
                              {user && 
                                <Nav>
                                  {!user.isAdmin && <Nav.Link> <IconCart style={{color:"silver", fontSize:"20px"}}/></Nav.Link>}
                                    <NavDropdown title={`Hi ${ user.fullName}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                                
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={event=> logOut(event)} as = {Link} to="/">LogOut</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                              }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
             </Navbar>

           
        </>
    )
}