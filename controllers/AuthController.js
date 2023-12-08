import User from "../models/User.js";


//register new user
const register = async (req, res) => {

    const {email,username} = req.body;

    //verify if email and/or username  exists already
    const isEmail = await User.findOne({email});
    const isUsername = await User.findOne({username});
    
    if (isEmail || isUsername) {

        const error = new Error('User registered before');
        return res.status(400).json({
            "error": true,
            "message":error.message
        });
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
        return res.status(400).json({
            "error": true,
            "message":"please insert all info"
        });
    }
   
}

//login user
const login = (req, res) =>{
    res.send('login user')
}


export {register, login};