

import { Button } from 'react-bootstrap'
import './orderCard.css'
export default function OrderCard(prop){
    

   

    const defaultImage = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'

    return(
        <div className="order-container">
            <img className="p-1" height={140} src={prop.image ?? defaultImage} alt='' />
            <div>
            <p>Product: {prop.productName}</p>
            <p className='order-id'>Order ID: {prop._id} </p>
            <p>Quantity: {prop.quantity} <span>Price: {prop.price}</span>   <span className='price'>Total: ₱{prop.totalAmount}</span></p>

            
            {prop.orderStatus !== "recieved" &&  <Button onClick={()=>prop.recivedOrder(prop._id)} variant='danger'>Recieve Order</Button>}
            {!prop.isRated && prop.orderStatus ==="recieved" &&  <Button  variant='danger'>Add Rating</Button>}
            </div>
              
        </div>
    )
}