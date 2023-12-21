import { response } from "express";
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
        
        res.status(201).json(property)
        
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


const search = async (req, res, next) =>{
    
   try {

    //query parameters
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer==='false') {
        offer = {$in: [false, true]};
    }


    let furnished = req.query.furnished;
    if (furnished === undefined || furnished==='false') {
        furnished = {$in: [false, true]};
    }

    let parking = req.query.parking;
    if (parking === undefined || parking==='false') {
        parking = {$in: [false, true]};
    }


    let type = req.query.type;
    if (type === undefined || type==='all') {
        type = {$in: ['sale', 'rent']};
    }


    let search = req.query.item || '';

    let sort = req.query.sort || 'createdAt';

    let order = req.query.order || 'desc';


    const items = await Property.find({
        name:{
            $regex:search,
            $options: 'i'
        },
        offer,
        furnished,
        parking,
        type
    }).sort({
        [sort]:order
    }).limit(limit).skip(startIndex);

    return res.status(200).json(items);


   } catch (error) {
    return next(error);
   }
}



export{
    index,
    store,
    remove,
    show,
    update,
    search
}