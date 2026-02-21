import { assets } from "../assets/assets";

const Footer = () =>{
    return (
      <div>
          <div className=" flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} className="mb-5 w-32" alt="" />
                <p className=" w-full md:w-2/3 text-gray-600">
                   Elevate your kitchen with our premium artisanal storage collection, thoughtfully designed for modern Indian homes. We specialize in handwoven, eco-friendly wicker and durable PVC baskets that combine functionality with timeless rustic charm. Each basket is carefully crafted to help you organize your pantry, countertops, and shelves with ease — while enhancing the overall aesthetic of your space.
                   Our kitchen storage baskets are lightweight, sturdy, and built for everyday use. Whether you're storing vegetables, fruits, groceries, kitchen essentials, or household items, our baskets provide a practical yet stylish solution. The breathable woven design ensures better air circulation, making them ideal for pantry organization.
                   At SaifWud Plus Kitchen we believe organization should look beautiful. That’s why every piece is designed to be durable, easy to maintain, and visually appealing — perfect for homes that value both cleanliness and decor.
                   Upgrade your home with eco-conscious, handcrafted kitchen storage baskets that help you create a clutter-free, elegant, and well-organized space.
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