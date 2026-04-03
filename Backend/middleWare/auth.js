
import jwt from 'jsonwebtoken' ;

const authUser = async (req, res, next) => {
    const {token} = req.headers;

    console.log('Token received:', token);

    if (!token) {
        return res.json({success: false, message: 'Not Authorized Login Again'});
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log('Verify failed with secret:', process.env.JWT_SECRET);
        return res.json({success: false, message: 'Invalid Token, Please Login Again'});
    }
};

export default authUser ;
