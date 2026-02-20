import { assets } from "../assets/assets";

const Footer = () =>{
    return (
      <div>
          <div className=" flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} className="mb-5 w-32" alt="" />
                <p className=" w-full md:w-2/3 text-gray-600">
                   Elevate your home with our artisanal kitchen storage collection. We specialize in handwoven, eco-friendly wicker baskets designed to bring order and rustic charm to your pantry. Every piece is crafted for durability and style, helping you create a clutter-free, beautiful kitchen
                </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">Company</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+1-214-9632</li>
                    <li>saifwud@gmail.com</li>

                </ul>

            </div>
        </div>
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ shopify.com - All Right Reserved.</p>
        </div>
      </div>
    )
} ;

export default Footer ;