import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestsellers] = useState([]); // Use camelCase for state

    useEffect(() => {
        // Run this whenever 'products' changes (e.g., after API fetch)
        if (products && products.length > 0) {
            const filtered = products.filter((item) => item.bestseller);
            setBestsellers(filtered.slice(0, 5));
        }
    }, [products]); 

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={"BEST"} text2={'SELLERS'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                   Shop our top-rated kitchen wicker baskets, trusted by home cooks for their durability and timeless design. These are the essentials our customers choose most for a perfectly organized home.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSellers.map((item) => (
                    <ProductItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        image={item.image} 
                        // IMPORTANT: Pass variants so the card shows the real price
                        variants={item.variants} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;