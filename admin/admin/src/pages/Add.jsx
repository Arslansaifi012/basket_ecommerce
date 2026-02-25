import { useState } from "react";
import upload from "../assets/upload.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [loading, setLoading] = useState(false) ;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("WardrobeStorage");
  const [subCategory, setsubCategory] = useState("CabinetPull-outs");
  const [bestseller, setBestseller] = useState(false);

  const [variants, setVariants] = useState([{ size: "", price: "", oldPrice: "" }]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariantField = () => {
    setVariants([...variants, { size: "", price: "", oldPrice: "" }]);
  };

  const removeVariantField = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const onsubmitHandler = async (e) => {
    setLoading(true) ;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("variants", JSON.stringify(variants));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
      

      if (response.data.success) {
        setLoading(false) ;
        toast.success(response.data.message);
        
        setName("");
        setDescription("");
        setVariants([{ size: "", price: "", oldPrice: "" }]);
        setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
        
        <form onSubmit={onsubmitHandler} className="space-y-6">
          
          {/* Card 1: Images */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Product Images</p>
            <div className="flex flex-wrap gap-4">
              {[image1, image2, image3, image4].map((img, index) => (
                <label key={index} htmlFor={`image${index + 1}`} className="group relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-offset-amber-700 cursor-pointer bg-gray-50">
                    <img 
                      className="w-full h-full object-cover" 
                      src={!img ? upload : URL.createObjectURL(img)} 
                      alt="" 
                    />
                  </div>
                  <input 
                    onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])} 
                    type="file" id={`image${index + 1}`} hidden 
                  />
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">* Recommended size: 800x800px</p>
          </div>

          {/* Card 2: Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">General Information</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-offset-amber-700 focus:border-transparent outline-none transition-all" 
                type="text" 
                placeholder="e.g. Premium Wicker Basket" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-offset-amber-700 outline-none transition-all" 
                placeholder="Describe the material, usage, and benefits..." 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                <select onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-offset-amber-700">
                  <option value="WardrobeStorage">Wardrobe Storage</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="PVCWickerBaskets">PVC Wicker Baskets</option>
                  <option value="KitchenStorage">Kitchen Storage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sub Category</label>
                <select onChange={(e) => setsubCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-offset-amber-700">
                  <option value="CabinetPull-outs">Cabinet Pull-outs</option>
                  <option value="PantryStorage">Pantry Storage</option>
                  <option value="Fruits&Vegetables">Fruits & Vegetables</option>
                  <option value="Tabletop&Serving">Tabletop & Serving</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Variants */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Pricing & Variants</p>
              <button 
                type="button" 
                onClick={addVariantField}
                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                + Add Another Size
              </button>
            </div>
            
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 items-end animate-in fade-in zoom-in duration-200">
                  <div className="flex-1 min-w-[150px]">
                    <p className="text-xs font-bold text-gray-500 mb-1">SIZE / MODEL</p>
                    <input 
                      value={variant.size} 
                      onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-200 outline-none focus:border-blue-400 bg-white" 
                      type="text" 
                      placeholder="e.g. 15W x 20D" 
                      required 
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <p className="text-xs font-bold text-gray-500 mb-1">SALE PRICE</p>
                    <input 
                      value={variant.price} 
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-200 outline-none focus:border-blue-400 bg-white" 
                      type="number" 
                      placeholder="0.00" 
                      required 
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <p className="text-xs font-bold text-gray-500 mb-1">MRP (OLD)</p>
                    <input 
                      value={variant.oldPrice} 
                      onChange={(e) => handleVariantChange(index, "oldPrice", e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-200 outline-none focus:border-blue-400 bg-white text-gray-400" 
                      type="number" 
                      placeholder="0.00" 
                    />
                  </div>
                  {variants.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeVariantField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Link 19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input 
                  onChange={() => setBestseller(prev => !prev)} 
                  checked={bestseller} 
                  type="checkbox" 
                  id="bestseller" 
                  className="peer appearance-none w-12 h-6 rounded-full bg-gray-300 checked:bg-[#AE7543] cursor-pointer transition-colors"
                />
                <label 
                  htmlFor="bestseller" 
                  className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-6 cursor-pointer"
                ></label>
              </div>
              <label className="font-medium text-gray-700 cursor-pointer" htmlFor="bestseller">Mark as Bestseller</label>
            </div>

            <button 
              type="submit" 
              className="w-full md:w-64 py-3.5 bg-[#AE7543] bg-[#AE7543] text-white font-bold rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
            >
              {loading === true ? "Loading...." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Add;