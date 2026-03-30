

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

 export { trackUserAction} ;