import { useContext, useDebugValue, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

const Collection = () =>{
    const {products, search, showSearch, updateQuantity} = useContext(ShopContext) ;
    // console.log(products);
    
    const [showFilter, setShowfilter] = useState(false) ;
    const [filterProducts, setFilterProducts]  = useState([]) ;
    const [category, setCategory] = useState([]) ;
    const [subCategory, setsubCategory] = useState([]) ;
    const [sortType, setsortType] = useState('relavent') ;

    const toggleCategory = (e) =>{

        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter((item) => item !== e.target.value)) ;
        }else{ 
            setCategory(prev => [...prev,e.target.value]) ;
        }
    }

    const toggleSubCategory = (e) =>{
        if (subCategory.includes(e.target.value)) {
            setsubCategory(prev => prev.filter((item) => item !== e.target.value)) ;
            
        }else{
            setsubCategory(prev => [...prev,e.target.value]) ;
        }
    }

    const applyFilter = () =>{
        let productsCopy = products?.slice() ;

        if (showSearch && search) {

            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) ;
            
        }
       
        if (category.length > 0) {
            console.log(category,'line 45');
            productsCopy = productsCopy.filter(item => category.includes(item.category)) ;   
                     
        }

        if (subCategory.length > 0) {
            
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory)) ;
        
        }
    
        setFilterProducts(productsCopy) ;
    };

    const getMinPrice = (product) => {
    return Math.min(...product.variants.map(v => v.price));
};

    const sortProduct  = () =>{
        const fpCopy = [...filterProducts];
        // console.log(fpCopy);
        
        switch( sortType ){
            case 'low-high' :
                setFilterProducts(
                    fpCopy.sort((a, b) => getMinPrice(a) - getMinPrice(b))
                ) ;
                break ;

                case 'high-low':
                    setFilterProducts(fpCopy.sort((a, b) => getMinPrice(b) - getMinPrice(a))) ;
                    break ;

                    default:
                        applyFilter() ;
                        break ;
        }
    }

    useEffect(() =>{
    
        applyFilter() ;
      
    },[category, subCategory, search, showSearch]) ;

    useEffect(()=>{
        sortProduct() ;
    },[sortType])

   

    return (
        <div className="flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

            <div className="min-w-60">
                <p onClick={()=>setShowfilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTER
                    <img className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/*Category filter */}

               <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        
        <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'PVCWickerBaskets'} onChange={toggleCategory}/> 
            PVC Wicker Baskets
        </p>

        <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'KitchenStorage'} onChange={toggleCategory}/> 
            Kitchen Storage
        </p>

        <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'WardrobeStorage'} onChange={toggleCategory}/> 
           Wardrobe Storage
        </p>

        <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'MultipurposeStorage'} onChange={toggleCategory}/> 
           Multipurpose Storage
        </p>

    </div>
</div>

                {/*SubCategory Filter */}

                  <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
  <p className="mb-3 text-sm font-medium">USAGE TYPE</p>
  <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
    
    <p className="flex gap-2">
      <input className="w-3" type="checkbox" value={'PantryStorage'} onChange={toggleSubCategory}/> 
      Pantry Storage
    </p>

    <p className="flex gap-2">
      <input className="w-3" type="checkbox" value={'Fruits&Vegetables'} onChange={toggleSubCategory}/> 
      Fruits & Vegetables
    </p>

    <p className="flex gap-2">
      <input className="w-3" type="checkbox" value={'CabinetPull-outs'} onChange={toggleSubCategory}/> 
      Cabinet Pull-outs
    </p>

    <p className="flex gap-2">
      <input className="w-3" type="checkbox" value={'Tabletop&Serving'} onChange={toggleSubCategory}/> 
      Tabletop & Serving
    </p>

  </div>
</div>
            </div>
            {/* Right Area*/} 
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />                         

                    {/*Product Sort */}

                    <select onChange={(e)=>setsortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relavent">sort by: Relavent</option>
                        <option value="low-high">sort by: low-high</option>
                        <option value="high-low">sort by: high-low</option>
                    </select>
                </div>

                {/*map products */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

                    {filterProducts && filterProducts.length > 0 ?  filterProducts.map((item, ind) =>(
                         
                            <ProductItem key={ind} name={item.name} id={item._id} price={item.price} image={item.image} variants={item.variants}/>
                        )):(
                            <p>Not Available : -</p>
                        )
                    }
                </div>

            </div>

        </div>
    )
} ;

export default Collection ;