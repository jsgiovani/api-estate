import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


//register new user
const register = async (req, res, next) => {

    const {email,username} = req.body;

    //verify if email and/or username  exists already
    const isEmail = await User.findOne({email});
    const isUsername = await User.findOne({username});
    
    if (isEmail || isUsername) {
        next(errorHandler(404, 'User registered already'));
    }


    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            "error": false,
            "status": true,
            message:'User registered succesfully'
        });


    } catch (error) {
       next(errorHandler(404, 'All fields are required'));
    }
   
}



//login user
const login = async (req, res, next) =>{
    
    const {email, password} = req.body;

    if (!email || !password) {
        next(errorHandler(404, 'All fields are required'));
    }




    try {
        
        const user = await User.findOne({email});

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        };

        //decrypt password
        const isPasswordOK = await user.passwordValidate(password);
        
        //if wrong password, return error
        if (!isPasswordOK) {
            return next(errorHandler(404, 'Wrong credentials'));
        }


        //generate access token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        
        const {password:pass, ...rest} = user._doc;

        //create cookie
        res
        .status(200)
        .json({
            "token":token,
            "user":rest
        });


    } catch (error) {
        next(error);
    }
}


export {register, login};