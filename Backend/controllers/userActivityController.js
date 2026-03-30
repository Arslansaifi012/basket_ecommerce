
import userActivityModel from "../models/userActitvityModel.js"; 

 const trackUserAction = async (req, res) =>{
    try {
        const { event, metadata, url, timestamp } = req.body;
    
        const userId = req.body.userId || "guest" ;
    
        const activity = new userActivityModel({
            userId,
            event,
            metadata,
            url,
            timestamp
        });

        await activity.save() ;
        res.status(200).json({success:true}) ;
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
 } ;


 const getRecentlyViewed = async () =>{

    try {

      const { userId } = req.body; 

      const activities = await userActivityModel.find({
        userId,
        event: 'view_item'
      }).sort({timestamp : -1}).limit(20) ;

      const  productIds = [...new Set(activities.map(a=> a.metadata.productId))].slice(0,5) ;
      console.log(productIds,'this is top 5 productIds');
      res.json({success:true, productIds})
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
        
    }
 };


 const getContentBasedRecommendations = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId || userId === "guest") {
            // Default: Return Best Sellers if user is a guest
            const bestSellers = await productModel.find({ bestseller: true }).limit(5);
            return res.json({ success: true, products: bestSellers });
        }

        // 1. Find the user's favorite category by counting "view_item" events
        const favoriteCategoryData = await userActivityModel.aggregate([
            { $match: { userId: userId, event: 'view_item' } },
            { $group: { _id: "$metadata.category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        if (favoriteCategoryData.length === 0) {
            const defaultProducts = await productModel.find().limit(5);
            return res.json({ success: true, products: defaultProducts });
        }

        const topCategory = favoriteCategoryData[0]._id;

        // 2. Fetch products from that category
        // We limit to 5 and skip items they might have viewed very recently to keep it fresh
        const recommendedProducts = await productModel.find({ 
            category: topCategory 
        }).limit(5);

        res.json({ success: true, products: recommendedProducts });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};



 export { trackUserAction, getRecentlyViewed, getContentBasedRecommendations} ;