import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewletterBox";
import Title from "../Components/Title";


const About = () => {
    return (
        <div>

            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                   
                   <p>Welcome to SaifWud – your trusted destination for premium PVC wicker storage baskets in India.
We specialize in durable, lightweight, and stylish storage solutions designed to organize modern homes effortlessly. Our PVC woven baskets combine strength, flexibility, and elegant design, making them perfect for kitchens, wardrobes, bathrooms, and living spaces.
At SaidWud, we focus on quality craftsmanship and practical functionality. Every basket is designed to provide long-lasting durability while enhancing the look of your space.
Whether you are looking for a kitchen storage basket, wardrobe organizer, or multipurpose home storage solution, we are committed to delivering products that meet everyday needs with style.</p>

                   <b className="text-gray-800"> Our Mission</b>
                   <p>Our mission is to provide high-quality PVC storage baskets that simplify home organization while maintaining affordability and modern design standards. </p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Premium Quality PVC Material:</b>
                    <p className="text-gray-600">Our storage baskets are crafted from high-grade PVC woven material that ensures superior durability, flexibility, and long-lasting performance. Unlike traditional baskets, our PVC wicker baskets are resistant to moisture, easy to maintain, and designed to withstand daily use. If you are looking for a durable storage basket for home use, our products offer the perfect balance of strength and style..</p>
                </div>

                 <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Multipurpose Home Storage Solution:</b>
                    <p className="text-gray-600">Our multipurpose storage baskets are ideal for kitchen storage, wardrobe organization, bathroom essentials, laundry use, and living room décor. Whether you need a wardrobe organizer basket, a kitchen storage basket, or a stylish home storage solution, our baskets are designed to meet various everyday storage needs efficiently.</p>
                </div>

                 <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Reliable Packaging & Customer Support</b>
                    <p className="text-gray-600">We prioritize customer satisfaction by ensuring secure packaging, safe delivery, and responsive customer service. Our goal is to provide a smooth and trustworthy online shopping experience for every customer.</p>
                </div>
            </div>

            <NewsletterBox />

        </div>
    )
} ;

export default About ;