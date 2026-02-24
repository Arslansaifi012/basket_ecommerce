
import { assets } from "../assets/assets";
const Navbar = ({setToken}) =>{
    return (
        <div>
           <div className="flex items-center py-2 px-[4%] justify-between ">
             <img src= {assets.logo} alt="logo" className="w-30"/>
            <button onClick={()=>setToken("")} className="bg-gray-600 text-white  sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm " >Log Out</button>
           </div>
        </div>
    )
} ;

export default Navbar ;
