import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ name, image, variants = [], id }) => {
  // 1. Safety Guard: Initialize state with 0 or a fallback
  // This prevents the "reading properties of undefined" error
  const [selectedPrice, setSelectedPrice] = useState(0);

  // 2. Sync state when variants data arrives
  useEffect(() => {
    if (variants && variants.length > 0) {
      setSelectedPrice(variants[0].price);
    }
  }, [variants]);

  // 3. Early return or conditional rendering if data is missing
  if (!variants || variants.length === 0) {
    return <div className="product-card">Loading...</div>;
  }

  return (
    
    <div className="product-card border p-4 rounded-lg shadow-sm">
      {/* image[0] safety check */}
      <Link to={`/product/${id}`}>
      <img 
        src={Array.isArray(image) ? image[0] : image} 
        alt={name} 
        className="w-full h-48 object-cover rounded"
      />
      
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      
      {/* Formatted Real Price */}
      <p className="text-xl font-bold text-green-700">
        ₹{Number(selectedPrice).toLocaleString('en-IN')}
      </p>
      </Link>

      {/* Size Selector */}
      <div className="mt-3">
        <label className="text-sm text-gray-600 block mb-1">Select Size:</label>
        <select 
          // 4. IMPORTANT: Convert e.target.value (string) to Number
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
          className="w-full p-2 border rounded bg-white cursor-pointer"
          value={selectedPrice}
        >
          {variants.map((v, index) => (
            <option key={index} value={v.price}>
              {v.size} — ₹{v.price.toLocaleString('en-IN')}
            </option>
          ))}
        </select>
      </div>
    </div>
    
  );
};

export default ProductItem;