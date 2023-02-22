import axios from "axios";
import { useEffect, useState } from "react"
import './viewProducts.css'

import {Button} from 'react-bootstrap'


import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from "react-router-dom";

export default function ViewAllProducts(){

   
    
    const [products, setProducts] =useState([]);
    const [searchProductID, setSearchProductId] = useState('');
    
    const [updatedArchive, setUpdatedArchive] = useState(false);

    function viewAll(event){
        event.preventDefault()
            axios.get('https://e-commerse-espiritu.onrender.com/product/allProducts',
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(response=>{
                setProducts(response.data)
            })
            setSearchProductId('')
    }


  
    useEffect(()=>{
        axios.get('https://e-commerse-espiritu.onrender.com/product/allProducts',
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response=>{
           
            setProducts(response.data)
        })
    },[updatedArchive])





   async function archive(event, productId){

    

        event.preventDefault();
        event.stopPropagation();
       await fetch(`https://e-commerse-espiritu.onrender.com/product/deactivatedProduct/${productId}`, 
        {
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result=> result.json())
        .then(data=> {
            setUpdatedArchive(previous=> !previous)
            toast.success(`Successfully changed isActive property into:! ${data.isActive}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        })
    }


    function getNotActive(event){
            event.preventDefault();

        axios.get(`https://e-commerse-espiritu.onrender.com/product/inActiveProducts`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response=>{
            setProducts(response.data)
        })
    }

   

    function searchByProductId(event){
            event.preventDefault();
            if(searchProductID !== ''){
                
                    axios.get(`https://e-commerse-espiritu.onrender.com/product/productId/${searchProductID}`,
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response=>{
                        // console.log(response);

                        if(response.data.status === "success"){
                            setProducts([response.data.result])
                        
                        }
                        else{
                            toast.error(`Invalid Product ID!`, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
                        }
                    })
            }
            else{
                toast.error(`Please input Product ID!`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }


    return(
        <>
            <div className="viewAllProduct">
           

                <Form className="queryControl">
                    <Form.Control
                    type="search"
                    className="inputSearch"
                    placeholder="Input product ID here"
                    aria-label="Search"
            
                    value={searchProductID}
                    onChange={event => setSearchProductId(event.target.value)}
                
                    />
                    <Button className="button" onClick={event=>searchByProductId(event)} variant="secondary">Search</Button>
                    <Button className="button" onClick={event=>viewAll(event)} variant="secondary">All Products</Button>
                    <Button className="button" onClick={event=>getNotActive(event)} variant="secondary">Not active</Button>
                 </Form>


                <table className="productsTable">
                    <thead>
                        <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stocks</th>
                        <th>Active</th>
                        <th>Archive</th>
                        </tr>
                    </thead>
                    <tbody>

                        {products.map((item, index)=>{
                           return <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stocks}</td>
                                    <td>{item.isActive? 'yes':'not'}</td>

                                    <td>
                                    
                                    <Button onClick={event=> archive(event, item._id)} className={item.isActive ?"archive":"activate"}>{item.isActive ? "Archive" : "Activate"}</Button>
                                    <Button as ={Link} to={`editProduct/${item._id}`} className="edit-btn">Edit</Button>
                                    </td>
                                  </tr>
                        })}
                       
                     
                    </tbody>
                </table>
                        <ToastContainer/>
            </div>
        </>
    )
}