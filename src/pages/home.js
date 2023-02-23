



import CarouselFade from "../components/design/carousel";
import ProductList from "../components/productList";


export default function Home(){



    return(
        <>
            <CarouselFade/>
            <h6 className="text-secondary text-center mt-5" >- All Products Catalogue -</h6>
            <ProductList/>


        </>
    )
}