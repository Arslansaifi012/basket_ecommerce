
import orderModel from "../models/orderModels.js";
import userModel from "../models/userMoel.js";
import Stripe from 'stripe' ;
// import razorpay from 'razorpay' ;
const currency  = 'inr' ;
const deliveryChharge = 10

//gateWay 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) ;

const placeOrder = async(req, res) =>{

    try {
        const {userId, items, amount, address} = req.body ;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'cod',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData) ;
        await newOrder.save() ;

         await userModel.findByIdAndUpdate(userId,{cartData:{}}) ;
         res.json({success:true, message:'placed Order Successfully'}) ;

    } catch (error) {
        
        console.log(error.message) ;
        res.json({success:false, message:error.message}) ;

        
    }

}

const placeOrderStripe = async(req, res) =>{

    try {

           const {userId, items, amount, address} = req.body ; 
           const {origin} = req.headers ;

            const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'stripe',
            payment:false,
            date:Date.now()
        }

        
        const newOrder = new orderModel(orderData) ;
        await newOrder.save() ;
     
        

        const line_items = items.map((item) =>({
            price_data:{
                 currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100 
            },
            quantity:item.quantity
        }));

       line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount:deliveryChharge*100
        },
        quantity:1
       }) ;

       const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id.toString()}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id.toString()}`,
        line_items,
        mode:'payment',
       }) ;

      res.json({success:true, session_url:session.url}); 
    
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }
};

const verifyStripe = async(req, res) =>{

    const {orderId ,  success, userId} =  req.body ;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment:true}) ;
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true}) ;
        }else{
            await orderModel.findByIdAndDelete(orderId) ;
            res.json({success:false})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }
}
 

const placeOrderRazorpay = (req, res) =>{

};

// All Order data for admin panel
const allOrders = async (req, res) =>{

    try {
        const allOrders = await orderModel.find({}) ;
        res.json({success:true,allOrders})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:true, message:error.message}) ;
    }

};


const userOrders = async(req, res) =>{

    try {
        const {userId} = req.body ;
        const orders = await orderModel.find({userId}) ;
        // console.log(orders);
        res.json({success:true, orders}) ;

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }

}; 


const updateStatus = async(req, res) =>{

    try {
        const {orderId, status} = req.body ;

        await orderModel.findByIdAndUpdate(orderId, {status}) ;
        res.json({success:true, message:'status Updated'});
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }

} ;


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus,verifyStripe} ;