import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewletterBox";
import Title from "../Components/Title";

const Contact = () => {
    return (
        <div>

            <div className="text-center text-2xl pt-10 border-t">
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
                <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />

                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
                    <p className="text-gray-500">We’d Love to Hear From You<br /> Have questions about our PVC wicker baskets or need help choosing the right storage solution? Our team is here to assist you.</p>
                    <p className="text-gray-500">Tel: (+91) 9310074411 <br /> Email:support@saifwud.com </p>
                    <p className="font-semibold text-xl text-gray-500">Mon – Sat | 10:00 AM – 6:00 PM</p>
                    <p className="text-gray-500">Premium Quality Storage Baskets Designed for Durability & Style. </p>
                    
                    <button

                    onClick={()=>{
                        window.open(
      "https://wa.me/9310074411?text=Hello%20I%20am%20interested%20in%20your%20storage%20baskets.",
      "_blank"
    );
                    }}
                    
                    className="bg-green-600 text-white px-10 py-3 text-sm font-semibold rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out">

  Chat on WhatsApp
</button>
                </div>
            </div>

            <NewsletterBox />


        </div>
    )
} ;

export default Contact ;