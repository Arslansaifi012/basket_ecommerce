

import logo from "../assets/logo.png" ;

 
const Navbar = ({setToken}) =>{
    return (
        <div>
           <div className="flex items-center py-2 px-[4%] justify-between ">
             <img src= {logo} alt="logo" className="w-[max(10%,80px)]"/>
            <button onClick={()=>setToken("")} className="bg-gray-600 text-white  sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm " >Log Out</button>
           </div>
        </div>
    )
} ;


export default Navbar ;
