import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useState,useEffect} from 'react';
import axios from 'axios';
import './addProduct.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function AddProducts(){

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



    useEffect(()=>{
        if(productName !=='' && productDescription !=='' && category !=='' && price !==0 && image1 !=='' && image2 !=='' && image3 !=='' && image4 !==''){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    },[productName, productDescription, category, price, image1, image2,image3 ,image4])


    function addProduct(event){
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/product/addProduct`,
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
            },

            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response =>{

            if(response.data.status ==="success"){
                toast.success(`${response.data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

                    setProdutName('')
                    setProductDescription('')
                    setCategory('')
                    setPrice(0)
                    setStocks(0)
                    setImage4('')
                    setImage3('')
                    setImage2('')
                    setImage1('')


            }
            else{
                toast.error(`${response.data.message}`, {
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

    return(
        <>
          
            <div className="log-in">
            <h2>Add Product!</h2>
            <span>Fill up all informations</span>
            <Form onSubmit={event=>addProduct(event)} className="col-10 col-md-8 col-lg-6 mt-4"  variant="dark">
                <Form.Group className="mb-3" controlId="formBasicProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Product Name"
                        value={productName}
                        onChange={(event)=>setProdutName(event.target.value)}
                         />
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control  as="textarea" 
                            rows={4}
                        placeholder="Product Descrition" 
                        value={productDescription}
                        onChange={event=> setProductDescription(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Category" 
                        value={category}
                        onChange={event=> setCategory(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Price" 
                        value={price}
                        onChange={event=> setPrice(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStocks">
                    <Form.Label>Stocks</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Password" 
                        value={stocks}
                        onChange={event=> setStocks(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage1">
                    <Form.Label>Image Links</Form.Label>

                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image1}
                        onChange={event => setImage1(event.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage2">
                  
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image2}
                        onChange={event => setImage2(event.target.value)}
                        required
                    />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage3">
                  
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image3}
                        onChange={event => setImage3(event.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage4">
                   
                    <Form.Control 
                        type="text" 
                        placeholder="Image Link" 
                        value={image4}
                        onChange={event => setImage4(event.target.value)}
                        required
                    />

                </Form.Group>
                
                



                <Button disabled={btnDisabled} variant="dark"  type="submit">
                    Submit
                </Button>
            </Form>
            
          <ToastContainer/>
        </div>
        </>
    )
}