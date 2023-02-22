
import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "./productCard/productCard";


import './productList.css'



export default function ProductList(){



    const [productList, setProductList] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/product/allActiveProducts`)
        .then(response =>{
    
            setProductList(response.data)
        })
    },[])

    const allProducts = productList.map( (item, index)=> <ProductCard key={index} {...item}/>)
           
    return(
        <>

            <div className="allProducts">
          
                {allProducts}
                
        
            </div>
        </>
    )
}