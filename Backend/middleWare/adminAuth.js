
import jwt from "jsonwebtoken" ;

const adminAuth = async (req, res, next) =>{
    try {
        const {token} = req.headers ;
        if (!token) {
            return res.jso({success:false, message:"NOt Authorized Login Again"}) ;
        }
        const token_decode = await jwt.verify(token, "arslan") ;

        if (token_decode !== process.env.ADMIN_EMAIL  + process.env.ADMIN_PASS) {
            return res.jso({success:false, message:"NOt Authorized Login Again"}) ;
        }
        next() ;
    } catch (error) {
           console.log(error.message,'Auth error') ;

        res.json({success:false, msg:error.message })
    }
}

export default adminAuth ;