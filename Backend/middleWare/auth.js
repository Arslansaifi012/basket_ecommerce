
import jwt from 'jsonwebtoken' ;

const authUser = async (req,res, next) =>{
    const {token} = req.headers ;


    if (!token) {
        return res.json({success:false, message: 'Not Authorized Login Again'}) ;
    } ;

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET) ;

        if (!token_decode || !token_decode.id) {
            return res.json({ success: false, message: 'Invalid Token Payload' });
        }

        if (!req.body) {
            req.body = {};
        }
    
        req.body.userId = token_decode.id ;
        // console.log( req.body.userId );
    
        next() ;

    } catch (error) {
        console.log(error.message,'auth error');
        res.json({success:false, message:error.message}) ;
        
    }
} ;

export default authUser ;
