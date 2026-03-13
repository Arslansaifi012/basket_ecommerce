
import express from 'express' ;
import cors from 'cors' ;

import 'dotenv/config'
import connectTodb from './config/mongodb.js';
import connectTocloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
//  App Config ;

const app = express() ;
const port = process.env.PORT || 4000 ;
connectTodb() ;
connectTocloudinary() ;

//middleWares ;
app.use(express.json()) ;
app.use(cors()) ;

// api endPoints ;

app.use('/api/user', userRouter) ;
app.use('/api/product', productRouter) ;
app.use('/api/cart/',cartRouter) ;


app.listen(port, () => console.log(`srever is running at : ${port} port`)) ;

