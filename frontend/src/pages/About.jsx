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
                   
                   <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. consequuntur unde quisquam quasi, omnis soluta inventore!
                   Unde ut, quaerat totam ullam obcaecati eum possimus soluta delectus vero? Sunt nemo fugit sequi noorrupti ad quis error!
                i quas quasi!</p>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum deleniti illo fuga, at aliquam velit eum expedita quae, recusandae sint minus ea id placeat dolorem dolorum, dicta odio? Itaque, nihil.
                   A consequatur nesciunt alias quaerat iure velit enim nulla fugit nemo officiis repellat dignissimos quasi nostrum odolorem nulla, temporibus iste!</p>

                   <b className="text-gray-800"> Our Mission</b>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium numquam quod rerum asperiores </p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae perferendis perspiciatis, repellendus veritatis quisquam excepturi ab libero atque, sunt non laborum. Sit quod perferendis unde ratione rem dolorum inventore.</p>
                </div>

                 <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Convenience:</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae perferendis perspiciatis, repellendus veritatis quisquam excepturi ab libero atque, sunt non laborum. Sit quod perferendis unde ratione rem dolorum inventore.</p>
                </div>

                 <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5" >
                    <b>Exceptional Customer Service</b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae perferendis perspiciatis, repellendus veritatis quisquam excepturi ab libero atque, sunt non laborum. Sit quod perferendis unde ratione rem dolorum inventore.</p>
                </div>
            </div>

            <NewsletterBox />

        </div>
    )
} ;

export default About ;