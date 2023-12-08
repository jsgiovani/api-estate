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
        const insertUser = await user.save();

        res.json({
            
            "error": false,
            user:insertUser
        });


    } catch (error) {
        res.json({
            error
        });
    }
   
}

//login user
const login = (req, res) =>{
    res.send('login user')
}


export {register, login};