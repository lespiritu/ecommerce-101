import { useEffect, useState } from 'react';
import { Form,  Button} from 'react-bootstrap'
import { MdDelete as IconDelete } from "react-icons/md";

import './cartCart.css'
export default function CartCard(props){
    const defaultImage = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'
    const {_id, productName,  price, image, quantity, deleteCartHandler, createOrder} = props;
    const [totalAmount, setTotalAmmout] = useState();
    
    const [quantityLocal, setQuantityLocal] = useState(quantity);
    useEffect(()=>{
        setTotalAmmout(price * quantityLocal)
    },[quantityLocal,price ])


    return(
        <div className='card-cart-container'>
        
                <div className='cart-details'>
                    <div><img height={130} src={image ?? defaultImage}alt={productName}/></div>
                    <div className='body-cart'>
                        <p>Product Name: {productName}</p>
                        <p>Price: ₱{price} <span style={{color:"orangered", fontWeight:"bold"}}>Total: ₱{totalAmount}</span></p>
                        <p className='pt-2 '>Quantity</p>
                        <div >
                            
                            <Form onSubmit={(event)=>createOrder(event,quantityLocal, props)}  className='bottom-control'>
                            <Form.Group  controlId="formBasicQuantity">
                                <Form.Control className='controler quantity ' 
                                
                                    type="number"
                                    value={quantityLocal}
                                    required
                                    min={1}
                                    onChange={(event)=>setQuantityLocal(event.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit' className='controler checkout' variant="secondary">Check-Out</Button>
                            </Form>  
                            
                        </div>
                    </div>
                    <IconDelete onClick={()=>deleteCartHandler(_id)} className='delete-icon' title='Delete'/>
                    {/* {quantity <=0 && <div className='out-of-stock'><h4>This Product is out of stocks</h4></div>} */}
                </div>
        
        </div>

        
    )
}