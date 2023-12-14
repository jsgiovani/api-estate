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


export{
    index,
    store
}