
import './adminDashBoard.css'
import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AdminDashBoard(){
    return(
        <>
            <div className="mt-5 " >
            <h1 className=" text-secondary">Admin dashboard</h1>
                 
            <Navbar bg="light" variant="light">
                <Container>
                
                <Nav className="me-auto">
                    <Nav.Link as ={NavLink} to ="addProduct">Add Product</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        
               
               <Outlet/>
            </div>
        </>
    )
}