import Property from "../models/Property.js";
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


const remove = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account')); 

    try {
        
        await User.findByIdAndDelete(req.params.id);

        res
        .status(200)
        .json('User has been deleted');

    } catch (error) {
        return next(error);
    }

}


const index = async(req, res, next) =>{
    // if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only view your own properties'));

    try {
        const properties = await Property.find({userRef:req.params.id});
        res.status(200).json(properties);
        
    } catch (error) {
        return next(error);
    }


}

export {update, remove, index};