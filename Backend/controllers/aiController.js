
import userActivityModel from '../models/userActitvityModel' ;

const getUserBehaviorSummary =  async (userId) =>{

    try {
        const history = await userActivityModel.find({userId}).sort({timestamp:-1}).limit(30) ;

        const categories = history.map(h => h.metadata?.category).filter(Boolean);
        const products = history.map(h => h.metadata?.name).filter(Boolean) ;

        const favoriteCategory = categories.sort((a , b) => categories.filter(v => v === a).length - categories.filter(v => v === b).length).pop();
        
        return {
            recentViewedProducts: [...new Set(products)].slice(0, 5),
            topInterest: favoriteCategory || "General",
            totalInteractions: history.length
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }

}

export {getUserBehaviorSummary}