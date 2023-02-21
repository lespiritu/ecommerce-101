
import './productCard.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

export default function ProductCard(prop){
    const defaultImage = 'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png'
    return(
     
            <Card as= {Link} to = {`viewProduct/${prop._id}`} className='product-card' >
                <Card.Img variant="top" src={prop.images[0] ?? defaultImage} />
                <Card.Body>
                
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item className='product-name'>{prop.productName}</ListGroup.Item>
                        <ListGroup.Item className='price'>Price: ₱{prop.price} </ListGroup.Item>
                        
                   
                    </ListGroup>
          
                </Card.Body>
            </Card>
       
        
    )
}