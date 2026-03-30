
import express from 'express' ;

import {trackUserAction,getContentBasedRecommendations} from '../controllers/userActivityController.js' ;
import authUser from '../middleWare/auth.js';
const trackRouter = express.Router() ;

trackRouter.post('/track',authUser, trackUserAction) ;
trackRouter.post('/recommendations', getContentBasedRecommendations);

export default trackRouter ;