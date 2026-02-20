import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from 'axios' ;
import { toast } from "react-toastify";



const Login = () => {

    const {token, setToken, navigate, backendUrl} = useContext(ShopContext) ;
    console.log(backendUrl);
    
    const [currentState, setCurrentState]  = useState('Login') ;
    const [name, setName] = useState('') ;
     const [email, setEmail] = useState('') ;
      const [password, setPassword] = useState('') ;

    const onSubmitHandler = async (e) =>{
        e.preventDefault() ;

        try {
            console.log(backendUrl);
            
           if (currentState === 'Sign Up') {

            const response = await axios.post(backendUrl + '/api/user/register',{name,email,password}) ;
            console.log(response);

            if (response.data.success) {
                setToken(response.data.token) ;
                localStorage.setItem('token',response.data.token) ;
            }else{
                toast.error(response.data.msg) ;
            }
            
           }else {

            const response = await axios.post(backendUrl + '/api/user/login', {email,password}) ;
            console.log(response.data);
            if (response.data.success) {
                setToken(response.data.token)
                  localStorage.setItem('token',response.data.token) ;

            }else{
                toast.error(response.data.msg) ;
            }

           }
                        
        } catch (error) {
            console.log(error.message);
            toast.error(error.message) ;
        }
    } ;


     useEffect(()=>{
        if (token) {
            navigate('/')
            
        }

    },[token]) ;

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
            </div>

           {currentState === 'Login' ? '' : <input type="text" onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />} 
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required />
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />

            <div className="w-full flex justify-between text-sm mt-[8px]">
                <p className="cursor-pointer">Forgot your password?</p>
                {
                    currentState === 'Login'
                    ? <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
                    : <p onClick={()=>setCurrentState('Login')} className="cursor-pointer">Login Here</p>
                }

            </div>

            <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">{currentState === 'Login'? 'Sign In' : 'Sign Up'}</button>

        </form>
    )
}

export default Login ;