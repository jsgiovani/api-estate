import Property from "../models/Property.js";
import { errorHandler } from "../utils/error.js";

const index = async (req, res, next) => {
    res
    .json({
        "mensaje": 'index'
    })
}


//create
const store = async (req, res, next) => {

    try {
        const property = await Property.create(req.body);
        
        return res.status(201).json(property)
        
    } catch (error) {
        next(error);
    }

}

const remove = async (req,res, next) =>{
    const property = await Property.findById(req.params.id);

    if (!property) return next(errorHandler(404, 'Property not found!'));


    if (req.user.id !== property.userRef) return next(errorHandler(401, 'You can only delete your own properties')); 

    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(201).json('Property has been deleted');
    } catch (error) {
        next(error);
    }

}


const show = async (req, res, next) => {

    const property = await Property.findById(req.params.id);

    if (!property) return next(errorHandler(404, 'Property not found!'));

    try {
        

        res
        .status(200)
        .json(property);

    } catch (error) {
        return next(error);
    }

}


const update = async (req, res, next) => {

    const property = await Property.findById(req.params.id);

    if (!property) return next(errorHandler(404, 'Property not found!'));


    if (req.user.id !== property.userRef) return next(errorHandler(401, 'You can only update your own properties')); 


    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res
        .status(200)
        .json(updatedProperty);

    } catch (error) {
        return next(error);
    }

}




export{
    index,
    store,
    remove,
    show,
    update

}