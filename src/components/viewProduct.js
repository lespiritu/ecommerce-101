
import { BsFillStarFill as IconStar } from "react-icons/bs";
import { Row , Col, Button, Form, Container} from "react-bootstrap"
import './viewProduct.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ViewProduct(){
    const navigate = useNavigate();

  const defaultImage = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'

  const {productId} = useParams();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [productDescription, setProductDescription] = useState('')
  const [images, setImages] = useState([]);
  const [ratings, setRatings] = useState([])

  const [primaryImage, setPrimaryImage] = useState(defaultImage);
  

    useEffect(()=>{
        axios.get(`https://e-commerse-espiritu.onrender.com/product/productIdActive/${productId}`)

        .then(response => {
            console.log(response.data);
            if(response.data.status === 'success'){
                setProductName(response.data.result.productName)
                setCategory(response.data.result.category)
                setPrice(response.data.result.price)
                setStocks(response.data.result.stocks)
                setProductDescription(response.data.result.productDescription)
                setImages(response.data.result.images)
                setPrimaryImage(response.data.result.images[0])
                setRatings(response.data.result.ratings)
            }   
            else{
                navigate('/*')
            }
        })

    },[productId, navigate])


    function changePrimaryImage(image){
        setPrimaryImage(image)
    }

 
    return(
        <Container className="product-view">
            
            <Row className=" py-4 ">
                
                <Col className="p-2 mt-4 col-12 col-md-6  col-xl-5">
                    <img className="w-100 border" src={primaryImage ?? defaultImage}  alt='' />
                    <Row className="mt-2">
                         <Col className="thumbnailImages">
                            <img onClick={()=>changePrimaryImage(images[0])} className="w-100 border" src={images[0] ?? defaultImage} alt={productName} />
                        </Col>
                        <Col className="thumbnailImages">
                            <img onClick={()=>changePrimaryImage(images[1])} className="w-100 border" src={images[1] ?? defaultImage} alt={productName} />
                        </Col>
                        <Col className="thumbnailImages">
                            <img onClick={()=>changePrimaryImage(images[2])} className="w-100 border" src={images[2] ?? defaultImage} alt={productName} />
                        </Col>
                        <Col className="thumbnailImages">
                            <img onClick={()=>changePrimaryImage(images[3])} className="w-100 border" src={images[3] ?? defaultImage} alt={productName} />
                        </Col>
                        
                    </Row>
                </Col>

                <Col className="p-2 mt-4 col-12 col-md-6 col-xl-7 ">
                    <Row className="col-12 mx-auto">
                        <h4>{productName}</h4>
                        <p>{category}</p>
                        <p>Price: ₱{price}</p>
                      
                        <p>Stocks: {stocks}</p>
                    </Row>
                    
                    <Row className="col-12 mx-auto">


                        <Form  className=""  variant="dark">
                        
                            <Row className="quantity-controler">
                                
                              
                                <Col className="col-4">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Quantity</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            min={1}
                                            // value={email}
                                            // onChange={(event)=>setEmail(event.target.value)}
                                            />
                                    
                                    </Form.Group>
                                </Col>
                            
                            
                            </Row>

            

                        <Button className="me-2" variant="dark" >Add to Cart</Button>
                        <Button className="me-2" variant="dark" >Buy Now</Button>
                        </Form>
                        
                    </Row>
        
                </Col>

            </Row>
            <Row className="col-12 mx-auto">
                        <h4>Product Description</h4>
                        <p>{productDescription}</p>

            </Row>
    
        { ratings.length ? 
            <Row className="col-12 mx-auto ">
                <h4>Customer Ratings</h4>
                {ratings.length ? ratings.map( (item, index)=> {
                    return (
                        <Row key={index} className="col-12 mx-auto mt-2 customer-rating">
                        <div className="star-Rating">
                        {  [...Array(item.rating).keys()].map( (index)=><IconStar key={index}/>)}
                        </div>
                        <p>{item.userAccount}</p>
                        <p>{item.feedBack}</p>
                        </Row>
                    )
                })
                : <p>This product don't have ratings yet!</p>}   
            </Row>
            
            : null
        }
            
            
     
        </Container>
    )
}