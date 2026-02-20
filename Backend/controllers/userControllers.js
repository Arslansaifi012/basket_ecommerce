
import validator from 'validator' ;

import userModel from "../models/userMoel.js";

import bcrypt from "bcrypt" ;

import jwt from "jsonwebtoken" ;

const createToken = (id) =>{

    return jwt.sign({id}, process.env.JWT_SECRET) ;

}
 
const loginUser = async(req, res) =>{

    try {
        const {email, password} = req.body ;

          if (!validator.isEmail(email)) {
            return res.json({success:false, msg:`this email not valid`}) ;
        }

    const user = await userModel.findOne({email}) ;

    if (!user) {

        return res.json({success:false, msg:`user doesn't exist this email`}) ;

    } ;

    const isMatch = await bcrypt.compare(password, user.password)  ;

    if (isMatch) {
        
        const token = createToken(user._id) ;

        res.json({success:true, token}) ;
    }else{
        res.json({success:false, msg:`Invalid Credentils`}) ;
    }

    
    } catch (error) {

        console.log(error,'it,s loginerror')
        res.json({success:false, msg:error.message}) ;
    }

} ;

const registerUser = async(req, res) =>{

    try {

        const {name, email, password} = req.body ;

        const exist = await userModel.findOne({email})  ;
    
        if (exist) {
            return res.json({success:false , msg:`user already exist this email`}) ;
        } ;

        if (!validator.isEmail(email)) {
            return res.json({success:false, msg:`this email not valid`}) ;
        }

        if (password.length < 8) {
            return res.json({success:false, msg:`please enter a strong password`})
        }

        const salt = await bcrypt.genSalt(10) ;

        const hashedPassword = await bcrypt.hash(password, salt) ;

        const newUser = new userModel({
            name, 
            email,
            password:hashedPassword,
        
        }) ;

        const user = await newUser.save() ;

       const token =  createToken(user._id) ;

       res.json({success:true, token}) ;


    } catch (error) {
        console.log(error) ;

        res.json({success:false, msg:error.message});
    }

};

const adminLogin = async(req, res) =>{

    try {
        
    const {email, password} = req.body ;

    if (email === process.env. ADMIN_EMAIL && password === process.env. ADMIN_PASS) {
        
        const token = jwt.sign(email+password, 'arslan') ;

        res.json({success:true, token}) ;

    }else{
        res.json({success:false, message: "Invalid credentials"}) ;
    }

    } catch (error) {

             console.log(error) ;

        res.json({success:false, msg:error.message});
    }

} ;

export {loginUser, registerUser, adminLogin} ;

