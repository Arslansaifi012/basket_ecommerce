
import {  createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext({
     getCartCount: () => 0,   
  setShowSearch: () => {}
}) ;

const ShopContextProvider = (props) =>{

    const  Currency = "$" ;
    const deliveryFee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('') ;
    const [showSearch, setShowSearch] = useState(false) ;
    const [cartItems, setCartItems] = useState({}) ;
    // const [products, setPorducts] = useState([]);
    const [token, setToken] = useState('') ;
    const navigate = useNavigate() ;

    const addTocart = async (itemId, size) =>{
        if (!size) {
            toast.error('Please Select Product Size') ;
            return ;
        }

        let cartData = structuredClone(cartItems) ;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }else {
                cartData[itemId][size] = 1 ;
            }
            
        }else {
            cartData[itemId] = {} ;
            cartData[itemId][size] = 1 ;
        }
        setCartItems(cartData) ;
    } ;
    
    const getCartCount = () =>{
        let totalCount = 0 ;

        for(const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount+= cartItems[items][item] ;
                        
                    }
                } catch (error) {
                    toast.error(error.message)
                    console.log(error.message,'cart error');
                }
            } 
        }
        return totalCount ;
    } 

    const updateQuantity = (itemId, size, quantity) =>{
        let cartData = structuredClone(cartItems) ;
        cartData[itemId][size] = quantity ;
        setCartItems(cartData) ;
    } ;


  /// CART AMOUNT ///////////

    const getCartAmount = (cartItems, products) => {
    if (!cartItems || !products) return 0;

    // Build product index once (O(n))
    const productIndex = {};

    for (const product of products) {
        const variantMap = {};

        for (const variant of product.variants) {
            variantMap[variant.size] = variant.price;
        }

        productIndex[product._id] = variantMap;
    }

    // Calculate total (O(cart items))
    let total = 0;

    for (const productId in cartItems) {
        const variants = productIndex[productId];
        if (!variants) continue;

        for (const size in cartItems[productId]) {
            const quantity = cartItems[productId][size];
            if (quantity <= 0) continue;

            const price = variants[size];
            if (!price) continue;

            total += price * quantity;
        }
    }
console.log(total);

    return total;
};

    const value = {
        products , Currency , deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addTocart ,
        getCartCount ,
        updateQuantity,getCartAmount,
        navigate,
        token,setToken,backendUrl
    }

    return(
        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>
    )
} ;

export default ShopContextProvider ;  
