import NavDropdown from 'react-bootstrap/NavDropdown';
import './adminDashBoard.css'
import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AdminDashBoard(){
    return(
        <>
            <div className="mt-5 " >
            <h1 className=" text-secondary">Admin dashboard</h1>
                 
            <Navbar  bg="light" variant="light">
                <Container>
                
                <Nav className="me-auto">
                 

                    <NavDropdown title={`Products`} id="basic-nav-dropdown">
                        <NavDropdown.Item as ={Link} to ="addProduct">Add Product</NavDropdown.Item>
                        <NavDropdown.Item as ={Link} to ="viewProducts">View Products</NavDropdown.Item>
                     
                    </NavDropdown>

                    <NavDropdown title={`Orders`} id="basic-nav-dropdown">
                        <NavDropdown.Item as ={Link} to ="ordersAdminList">View all Orders</NavDropdown.Item>
                     
                     
                    </NavDropdown>
                </Nav>
                </Container>
            </Navbar>
        
               
               <Outlet/>
            </div>
        </>
    )
}