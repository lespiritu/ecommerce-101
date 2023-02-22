import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './editProduct.css'

import { useState,useEffect} from 'react';
import { useParams} from 'react-router-dom'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';


export default function EditProduct(){

    const {productId} = useParams()
 

    const [productName, setProdutName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [enableAll, setEnableAll] =useState(false)

    useEffect(()=>{
        if(enableAll){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    },[enableAll])


   
        
    useEffect( ()=>{
  
        axios.get(`${process.env.REACT_APP_API_URL}/product/productId/${productId}`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => {
           
            setProdutName(response.data.result.productName ?? '' )
            setProductDescription(response.data.result.productDescription ?? '')
            setCategory(response.data.result.category ?? '')
            setPrice(response.data.result.price ?? '')
            setStocks(response.data.result.stocks ?? '')
            setImage1(response.data.result.images[0] ?? '')
            setImage2(response.data.result.images[1] ?? '')
            setImage3(response.data.result.images[2] ?? '')
            setImage4(response.data.result.images[3] ?? '')

        }) 
       
    },[productId])


    // Code to edit details of a product
    function editProduct(event, id){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/product/update/${id}`, 
            {
                method:"PUT",
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(
                    {
                        productName:productName,
                        productDescription:productDescription,
                        category:category,
                        price:price,
                        stocks:stocks,
                        image1:image1,
                        image2:image2,
                        image3:image3,
                        image4:image4
                    }
                )
            }
        )
        .then(data=>data.json())
        .then(response=> {
           if(response.status === 'success'){
            toast.success(`${response.message}`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

                setEnableAll(false)

           }
           else{
            toast.error(`${response.message}`, {
                position: "top-center",
                autoClose: 1000,
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

const enableHandler = ()=>{
    setBtnDisabled(false)
    setEnableAll(true)
}
    return(
        <>
            <div className='edit-product'>
            
                     
            <Form onSubmit={event=>editProduct(event, productId)} className="col-10 col-md-8 col-lg-6 mt-4"  variant="dark">
                <Form.Group className="mb-3" controlId="formBasicProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Product Name"
                        value={productName}
                        disabled ={btnDisabled}
                        required
                        onChange={(event)=>setProdutName(event.target.value)}
                         />
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control  as="textarea" 
                            rows={4}
                        placeholder="Product Descrition" 
                        value={productDescription}
                        disabled ={btnDisabled}
                        required
                        onChange={event=> setProductDescription(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Category" 
                        value={category}
                        required
                        disabled ={btnDisabled}
                        onChange={event=> setCategory(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Price" 
                        value={price}
                        required
                        disabled ={btnDisabled}
                        onChange={event=> setPrice(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStocks">
                    <Form.Label>Stocks</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Password" 
                        value={stocks}
                        required
                        disabled ={btnDisabled}
                        onChange={event=> setStocks(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage1">
                    <Form.Label>Image Links</Form.Label>

                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image1}
                        disabled ={btnDisabled}
                        onChange={event => setImage1(event.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage2">
                  
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image2}
                        disabled ={btnDisabled}
                        onChange={event => setImage2(event.target.value)}
                        required
                    />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage3">
                  
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image3}
                        disabled ={btnDisabled}
                        onChange={event => setImage3(event.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage4">
                   
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image4}
                        disabled ={btnDisabled}
                        onChange={event => setImage4(event.target.value)}
                        required
                    />

                </Form.Group>
                
                



                <Button disabled={btnDisabled} variant="dark"  type="submit">
                    Submit
                </Button>

                <Button onClick={enableHandler} style={{marginLeft:'5px'}} className="edit-btn" variant='success'>Edit Product</Button>   
            </Form>
    
            </div>
        </>
    )
}