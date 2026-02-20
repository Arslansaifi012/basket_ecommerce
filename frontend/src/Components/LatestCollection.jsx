import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import Product from "../pages/Product";
import ProductItem from "./ProductItem";

const LatestCollection = () =>{

    const {products} = useContext(ShopContext) ;

    const [latestProducts, setlatestProducts] = useState([]) ;

    useEffect(()=>{
        setlatestProducts(products.slice(0,10)) ;
    }, [products])

  return(
 <div className="my-10">
       <div className="text-center py-8 text-3xl">
       <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
       
       <p className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
       Bring a touch of organic warmth to your culinary space. Explore our latest collection of artisanal wicker baskets, where rustic charm meets modern kitchen organization.
       </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

{
  latestProducts.map((item) => (
    <ProductItem
      key={item._id}
      id={item._id}
      image={item.image[0]}
      name={item.name}
      // Pass the whole array so the card knows all prices
      variants={item.variants} 
    />
  ))
}
    </div>
 </div>
  )
} ;

export default LatestCollection