
import express from 'express' ;

import {trackUserAction} from '../controllers/userActivityController.js' ;
import authUser from '../middleWare/auth.js';
const trackRouter = express.Router() ;

trackRouter.post('/track',authUser, trackUserAction) ;

export default trackRouter ;