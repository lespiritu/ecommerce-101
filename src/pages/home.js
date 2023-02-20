
import { useContext } from "react"
import ProductCard from "../components/productCard/productCard"
import UserContext from "../context/userContext"

export default function Home(){

    const {userData} = useContext(UserContext)
    return(
        <>
            <h1>Home</h1>
           <ProductCard/>
            
        </>
    )
}