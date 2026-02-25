import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.productS);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
        console.log(response);
        
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList(); // Refresh list after deletion
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Products List</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {list.length} Products Found
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* --- Table Header --- */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_2fr_0.5fr] items-center py-4 px-6 bg-gray-50 border-b border-gray-200 text-gray-500 font-medium text-sm">
          <span>Image</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Prices & Variants</span>
          <span className="text-center">Action</span>
        </div>

        {/* --- Product List --- */}
        <div className="flex flex-col">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_2fr_0.5fr] items-center gap-4 py-4 px-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                <img className="w-full h-full object-cover" src={item.image[0]} alt={item.name} />
              </div>

              {/* Name */}
              <div className="flex flex-col">
                <p className="text-base font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400 md:hidden">{item.category}</p>
              </div>

              {/* Category (Hidden on mobile, shown in Name block instead) */}
              <p className="hidden md:block text-gray-600 font-medium uppercase text-xs tracking-wider">
                {item.category}
              </p>

              {/* Variants & Prices */}
              <div className="flex flex-wrap gap-6 overflow-x-auto">
                {item.variants.map((varArr, vIndex) => (
                    console.log(varArr),
                    
                  <div key={vIndex} className="flex flex-col text-xs min-w-max border-l-2 border-blue-200 pl-3">
                    <span className="text-gray-400 font-medium mb-1 uppercase tracking-tighter">
                      {varArr.size}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {currency}{varArr.price}
                    </span>
                    <span className="text-gray-400 line-through">
                      {varArr.oldprice ? `${currency}${varArr.oldprice}` : "-"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="flex justify-end md:justify-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 cursor-pointer"
                  title="Remove Product"
                >
                  <span className="text-xl font-light">×</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="p-20 text-center text-gray-400">
            <p>No products found. Start by adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;