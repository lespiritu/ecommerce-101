import './navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BsFillCartFill as IconCart } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';


import { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// component function
export default function NavBar(){
    const logo = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1677127544/samples/ecommerse101-sample/web-images/logo-1_vqfsyc.png'

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)


    // code for log out
    function logOut(event){
        event.preventDefault();
        setUser(null);
        localStorage.removeItem("token");
        navigate('/')
    }

    useEffect( ()=>{
 
        axios.get(`${process.env.REACT_APP_API_URL}/user/details`,
                  {
                      headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  }
              )
    
            .then(response => {
            
                if(localStorage.getItem('token') !== null){
                  setUser(
                    response.data
                  )
                }
                else{
                  setUser(null)
                }
                
            })
    
    
    },[setUser])
    
    
    return(
        <>
            
            <Navbar bg="dark" variant='dark' sticky="top" >
                    <Container>
                         <Navbar.Brand  as = {NavLink} to="/">
                            <img height={40}  src={logo} alt='logo'/>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto ">
                                <Nav.Link className='text-nav'  as = {NavLink} to="/">Home</Nav.Link>
                                {!user && 
                                    <>
                                    <Nav.Link className='text-nav' as = {NavLink} to="login">Login</Nav.Link>
                                    <Nav.Link className='text-nav'  as = {NavLink} to="signup">Signup</Nav.Link>
                                    </>
                                }
                                
                              {user && 
                                <Nav>
                                  {!user.isAdmin && <Nav.Link as ={Link} to ='/cartView'> <IconCart className='icon-cart'/></Nav.Link>}
                                    <NavDropdown className='text-nav' title={`Hi ${ user.fullName}`} id="basic-nav-dropdown">
                                        {user.isAdmin && <NavDropdown.Item className='text-nav' as ={Link} to ="/adminDashBoard/viewProducts">Dashboard</NavDropdown.Item>}
                                        
                                        {!user.isAdmin && <NavDropdown.Item  className='text-nav'as={Link} to = "/cartView">View Cart</NavDropdown.Item>}
                                        {!user.isAdmin && <NavDropdown.Item className='text-nav' as={Link} to = "/ViewOrdersList">Orders</NavDropdown.Item>}
                                
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item className='text-nav' onClick={event=> logOut(event)} as = {Link} to="/">LogOut</NavDropdown.Item>
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