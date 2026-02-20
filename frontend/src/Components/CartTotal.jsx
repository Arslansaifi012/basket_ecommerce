import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

const CartTotal = () =>{

    const {getCartAmount, Currency, deliveryFee,cartItems, products} = useContext(ShopContext) ;
    
    const subtotal = getCartAmount(cartItems,products);
    const total = subtotal === 0 ? 0 : subtotal + deliveryFee;




    

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTAL'}/>
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{subtotal}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{Currency}{deliveryFee}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{Currency}{total}.00</b>

                </div>

            </div>

        </div>
    )
} ;

export default CartTotal ;