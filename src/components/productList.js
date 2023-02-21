
import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "./productCard/productCard";


import './productList.css'



export default function ProductList(){



    const [productList, setProductList] = useState([]);

    useEffect(()=>{
        axios.get('https://e-commerse-espiritu.onrender.com/product/allActiveProducts')
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