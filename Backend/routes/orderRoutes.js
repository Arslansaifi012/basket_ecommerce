import express from 'express' ;

import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus,verifyStripe} from '../controllers/orderController.js' ;
import adminAuth from '../middleWare/adminAuth.js' ;
import authUser from '../middleWare/auth.js';

const orderRouter  = express.Router() ;

// Admin Features ;
orderRouter.post('/list',adminAuth,allOrders) ;
orderRouter.post('/status', adminAuth,updateStatus) ;

// Payment Featurse 
orderRouter.post('/place', authUser,placeOrder) ;
orderRouter.post('/stripe', authUser,placeOrderStripe) ;
orderRouter.post('/razorPay', authUser, placeOrderRazorpay) ;

// userFeatures ; 
orderRouter.post('/userorders', authUser,userOrders) ;
orderRouter.post('/verifyStripe',authUser,verifyStripe) ;

export default orderRouter ;

