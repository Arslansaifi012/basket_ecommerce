
const NewsletterBox = () =>{

    const onSubmithandler = (e) =>{
        e.preventDefault() ;
    }
    return (
        <div className=" text-center">
            <p className="text-2xl font-medium text-gray-800">
                Subcribe Now & get 20% Off
            </p>
            <p className="text-gray-400 mt-3"> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur.
            </p>

            <form onSubmit={onSubmithandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 bolder pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Eneter you Email" required autoFocus/>
                <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBCRIBE</button>
            </form>

        </div>
    )
} ;

export default NewsletterBox ;