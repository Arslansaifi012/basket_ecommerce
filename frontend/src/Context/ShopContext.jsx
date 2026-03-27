
import {  createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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
    const [products, setPorducts] = useState([]);
    const [token, setToken] = useState('') ;
    const navigate = useNavigate() ;
  console.log(cartItems);
  

    const addTocart = async (itemId, size) =>{
       console.log(itemId, + "--======",size);
       console.log(token,'i am checking token');
       
        
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
        

        if(token){
           try {
            const response = await axios.post(
                backendUrl + '/api/cart/add',
                { itemId, size },
                { headers: { token } }
            );

            if (!response.data.success) {
                toast.error(response.data.message || 'Cart update failed');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    } ;

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

    const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    // Agar user logged in hai, toh backend ko bhi update karein
    if (token) {
        try {
            await axios.post(
                backendUrl + '/api/cart/update', 
                { itemId, size, quantity }, 
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
};


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

const getproductData = async() =>{
    try {

        const responce = await axios.get(backendUrl + '/api/product/list') ;
        console.log(responce, 'i am checking data 143');
        
        if (responce.data.success) {
            setPorducts(responce.data.productS)
            
        }else{
            console.log(responce.data.message);
            
        }

    } catch (error) {
        console.log(error.message);
        
    }
} ;

// Existing useEffect for products
useEffect(() => {
    getproductData();
}, []);

// Naya useEffect: Refresh hone par token aur cart wapas lane ke liye
useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (!token && localToken) {
        // Agar state mein token nahi h par localStorage mein h
        setToken(localToken);
        getUserCart(localToken); // Database se cart fetch karein
    }
}, []);

const getUserCart = async (token) => {
    console.log(token, 'this is my token ok ');
    
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            console.log(response, ' this is cartData 191');
            
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }



    const value = {
        products , Currency , deliveryFee,
        search,setCartItems, setSearch, showSearch, setShowSearch,
        cartItems, getproductData, addTocart ,
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
