
import {NavLink} from "react-router-dom" ;

const SidebarPanel = () =>{
    return (
        <div className="w-[18%] min-h-screen  border-r-1">

            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/add">
                   <span class="material-symbols-outlined">add_box</span>
                <p className="hidden md:block">Add Items</p>
                </NavLink>

                               <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/list">
                   <span class="material-symbols-outlined">order_approve</span>
                <p className="hidden md:block">List Items</p>
                </NavLink>

                               <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/orders">
                   <span class="material-symbols-outlined">order_approve</span>
                <p className="hidden md:block">Order</p>
                </NavLink>
            </div>

        </div>
    )
 } ;


 export default SidebarPanel ;

 