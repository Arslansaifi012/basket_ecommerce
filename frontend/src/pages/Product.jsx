import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../Components/RelatedProduct";

const Product = () => {

  const { productId } = useParams();
  const { products, Currency, addTocart, } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(""); // only string

  // Fetch Product
  useEffect(() => {
    const foundProduct = products.find(
      (item) => item._id === productId
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setSize(foundProduct.variants[0]?.size); // default first size
    }
  }, [productId, products]);

  // Get selected variant dynamically
  const selectedVariant = productData?.variants.find(
    (variant) => variant.size === size
  );

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* Left Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18%] w-full">
            {productData.image.map((img, ind) => (
              <img
                key={ind}
                onClick={() => setImage(img)}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Right Details Section */}
        <div className="flex-1">

          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Dynamic Price */}
          <div className="mt-5">
            <p className="text-3xl font-bold">
              {Currency}{selectedVariant?.price}
            </p>
            <p className="text-gray-500 line-through">
              {Currency}{selectedVariant?.oldPrice}
            </p>
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>

            <div className="flex flex-wrap gap-3">
              {productData.variants.map((variant, ind) => (
                <button
                  key={ind}
                  onClick={() => setSize(variant.size)}
                  className={`border rounded-lg p-3 text-left transition-all duration-200 w-[200px]
                    ${
                      variant.size === size
                        ? "border-orange-600 bg-orange-50"
                        : "border-gray-300 bg-white hover:border-gray-500"
                    }`}
                >
                  <p className="text-sm font-medium text-gray-700">
                    {variant.size}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold">
                      ₹{variant.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{variant.oldPrice}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={() => addTocart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash On Delivery Available</p>
            <p>Easy Return & Exchange Within 7 Days</p>
          </div>

        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
