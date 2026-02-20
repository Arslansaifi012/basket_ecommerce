
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
    const {products, Currency, cartItems, updateQuantity,navigate} = useContext(ShopContext) ;
    const [cartData, setCartData] = useState([]) ;

    useEffect(()=>{
        const tempData = [] ; 
        for(const items in cartItems){
            for(const item in cartItems[items]){
                
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id:items,
                        size:item,
                        quantity:cartItems[items][item] ,
                    })
                    
                }
            }
        }
        
        
        setCartData(tempData);
        
    },[cartItems]);
    
return (
    <div className="border-t pt-14">
        {/* Title */}
        <div className="text-2xl mb-3">
            <Title text1="YOUR" text2="CART" />
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-4">
            {cartData.map((item, ind) => {
        
  const productData = products.find(
  (product) => product._id === item._id
);

if (!productData) return null;

const selectedVariant = productData.variants.find(
  (variant) => variant.size === item.size
);
                return (
                    <div
                        key={ind}
                        className="grid sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 py-4 border-t border-b text-gray-700"
                    >
                        
                        <div className="flex items-start gap-4">
                            <img
                                src={productData.image[0]}
                                alt={productData.name}
                                className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                            />
                            <div className="flex flex-col justify-between">
                                <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                                <div className="flex items-center gap-6 mt-2">
                                    <p className="font-semibold">{Currency}{selectedVariant?.price}</p>
                                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded">
                                        {item.size}
                                    </p>
                                </div>
                            </div>
                        </div>

                     
                        <div className="flex justify-center">
                            <input
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                                className="border px-2 py-1 w-16 sm:w-20 text-center rounded"
                                onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value)) }
                            />
                          
                        </div>
                         <img onClick={()=>updateQuantity(item._id, item.size, 0)}  className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
                    </div>
                );
            })}

        </div>

        <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                    <button onClick={()=>navigate('/placeOrder')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>

                </div>
            </div>

        </div>

    </div>
);
}
export default Cart ;