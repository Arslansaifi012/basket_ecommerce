import { useState } from "react";
import upload from "../assets/upload.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // Image States
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Basic Info States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("WardrobeStorage");
  const [subCategory, setsubCategory] = useState("CabinetPull-outs");
  const [bestseller, setBestseller] = useState(false);

  // --- NEW: Variants State ---
  const [variants, setVariants] = useState([
    { size: "", price: "", oldPrice: "" }
  ]);

  // Handle Variant Changes
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
    e.preventDefault();
   
  
    
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      
      // Send variants as a JSON string
      formData.append("variants", JSON.stringify(variants));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      console.log(Object.fromEntries(formData.entries()));
   
      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset Form
        setName("");
        setDescription("");
        setVariants([{ size: "", price: "", oldPrice: "" }]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onsubmitHandler} className="flex flex-col w-full items-start gap-4 p-4">
      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className="w-20 h-20 object-cover border cursor-pointer" src={!img ? upload : URL.createObjectURL(img)} alt="" />
              <input 
                onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])} 
                type="file" id={`image${index + 1}`} hidden 
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[500px]">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2 border" type="text" placeholder="Wicker Basket" required />
      </div>

      <div className="w-full max-w-[500px]">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full px-3 py-2 border" placeholder="Product details..." required />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <p className="mb-2">Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border">
            <option value="WardrobeStorage">WardrobeStorage</option>
            <option value="Kitchen">Kitchen</option>
            <option value="PVCWickerBaskets">PVCWickerBaskets</option>
            <option value="KitchenStorage">KitchenStorage</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setsubCategory(e.target.value)} className="px-3 py-2 border">
            <option value="CabinetPull-outs">CabinetPull-outs</option>
            <option value="PantryStorage">PantryStorage</option>
            <option value="Fruits&Vegetables">Fruits&Vegetables</option>
             <option value="Tabletop&Serving">Tabletop&Serving</option>
          </select>
        </div>
      </div>

      {/* --- VARIANTS SECTION --- */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Variants (Size & Price)</p>
        {variants.map((variant, index) => (
          <div key={index} className="flex flex-wrap gap-2 mb-3 items-end border-b pb-3">
            <div className="flex-1 min-w-[150px]">
              <p className="text-xs text-gray-500">Size (e.g. 15"W x 16"D)</p>
              <input 
                value={variant.size} 
                onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                className="w-full px-2 py-1 border" type="text" placeholder="Size" required 
              />
            </div>
            <div className="w-24">
              <p className="text-xs text-gray-500">Price</p>
              <input 
                value={variant.price} 
                onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                className="w-full px-2 py-1 border" type="number" placeholder="2499" required 
              />
            </div>
            <div className="w-24">
              <p className="text-xs text-gray-500">Old Price</p>
              <input 
                value={variant.oldPrice} 
                onChange={(e) => handleVariantChange(index, "oldPrice", e.target.value)}
                className="w-full px-2 py-1 border" type="number" placeholder="4599" 
              />
            </div>
            {variants.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeVariantField(index)}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded"
              >Remove</button>
            )}
          </div>
        ))}
        <button 
          type="button" 
          onClick={addVariantField}
          className="mt-2 bg-gray-800 text-white px-4 py-1 text-sm rounded"
        >
          + Add Variant
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-32 py-3 bg-black text-white active:bg-gray-700">ADD PRODUCT</button>
    </form>
  );
};

export default Add;