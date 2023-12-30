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
            "user":rest,
            'token':token
        });


    } catch (error) {
        next(error);
    }
}

//register/login user with google auth
const google = async(req, res, next) =>{
    const {name,email, photo } = req.body;


    try {
        //find if user exists in db
        const findUser = await User.findOne({email});


        //if user is previusly registered, return info to client server else, register
        if (findUser) {

            //generate access token
            const token = jwt.sign({id:findUser._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = findUser._doc;


            //generate response
            res
            .status(200)
            .json({
                "token":token,
                "user":rest
            });

        }else{
            //genearte random password
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            //generate unique username
            const username = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8);

            const data = {
                username: username,
                email,
                photo,
                password:randomPassword
            };

            
            //register user to db
            const user = new User({...data});
            await user.save();

            //genearate token
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = user._doc;
    
            //send response to client-server
            res.status(201).json({
                "token": token,
                "user": rest
            });

        }

    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
   
    try {
        res
        .status(200).json('user logged out succesfully');

    } catch (error) {
        return next(error);
    }
}


export {register, login, google, logout};