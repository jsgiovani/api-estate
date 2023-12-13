import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

const update = async (req, res, next) =>{


    if (req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized')); 

    try {
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                photo:req.body.photo,
            }
        }, {new:true});

        const {password, ...rest} = updatedUser._doc;


        res
        .status(200)
        .json({
            "user":rest
        });
        

    } catch (error) {
        return next(error);
    }

}

export {update};