import './ordersAdminCard.css'

export default function OrdersAdminCard(prop){

    const defaultImage = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'


   
    return(
        <div className="orderAdmin-container">
            <img className="p-1" height={140} src={prop.image ?? defaultImage} alt='' />
            <div className='product-details'>
            <p>Product: {prop.productName}</p>
            <p>Order Data: {prop.OrderDate}</p>
            <p className='order-id'>Order ID: {prop._id} </p>
            <p>Quantity: {prop.quantity} <span>Price: ₱{prop.price}</span>   <span className='price'>Total: ₱{prop.totalAmount}</span></p>
            </div>

            <div className='user-details'>
                <p>Status: {prop.orderStatus}</p>
                <p>User ID: {prop.userId}</p>
                <p>User Email: {prop.userEmail}</p>
            </div>
              
        </div>
    )
}





