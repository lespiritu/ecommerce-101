
import { BsFillStarFill as IconStar } from "react-icons/bs";
import { Row , Col, Button, Form, Container} from "react-bootstrap"
import './viewProduct.css'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function ViewProduct(){

  
  const {productId} = useParams();

    useEffect(()=>{
        axios.get(`https://e-commerse-espiritu.onrender.com/product/productIdActive/${productId}`)

        .then(response => {
            console.log(response);
        })

    })


    const image = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'
    return(
        <Container className="product-view">
            
            <Row className=" py-4 ">
                
                <Col className="p-2 mt-4 col-12 col-md-6  col-xl-5">
                    <img className="w-100" src={image} alt='' />
                    <Row className="mt-2 col-xl-10">
                        <Col>
                            <img className="w-100" src={image} alt='' />
                        </Col>
                        <Col>
                            <img className="w-100" src={image} alt='' />
                        </Col>
                        <Col>
                            <img className="w-100" src={image} alt='' />
                        </Col>
                    </Row>
                </Col>

                <Col className="p-2 mt-4 col-12 col-md-6 col-xl-7 ">
                    <Row className="col-12 mx-auto">
                        <h4>Product Name</h4>
                        <p>Category</p>
                        <p>Price: 50000</p>
                      
                        <p>Stocks: 11</p>
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eaque quae dolore possimus doloremque molestias mollitia minima a ipsum et! Quo, odit facere vero ad eligendi quaerat minima autem repellat modi? Voluptatum facere, assumenda sequi dignissimos provident sunt maiores debitis fugiat esse, inventore architecto impedit fugit doloribus ea suscipit ipsum deleniti tenetur culpa. Dicta perferendis dolorum alias soluta veritatis, ipsum fugiat labore eum neque quos! Quidem voluptates sed enim sapiente iure commodi nobis ullam? Quae sunt necessitatibus facilis, recusandae dolor ut cupiditate natus. Adipisci, aperiam ducimus voluptate numquam soluta illum, corporis cupiditate placeat possimus blanditiis dicta, error debitis hic suscipit.</p>

            </Row>

            <Row className="col-12 mx-auto ">
                <h4>Customer Ratings</h4>

                <Row className="col-12 mx-auto mt-2 customer-rating">
                    <div className="star-Rating">
                    {  [...Array(5).keys()].map( (index)=><IconStar key={index}/>)}
                    </div>
                    <p>Customer email</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eaque quae dolore possimus doloremque molestias</p>
                </Row>

                <Row className="col-12 mx-auto mt-2 customer-rating">
                    <div className="star-Rating">
                    {  [...Array(5).keys()].map( (index)=><IconStar key={index}/>)}
                    </div>
                    <p>Customer email</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eaque quae dolore possimus doloremque molestias</p>
                </Row>

                <Row className="col-12 mx-auto mt-2 customer-rating">
                    <div className="star-Rating">
                    {  [...Array(5).keys()].map( (index)=><IconStar key={index}/>)}
                    </div>
                    <p>Customer email</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eaque quae dolore possimus doloremque molestias</p>
                </Row>

                
                
            </Row>

            
     
        </Container>
    )
}