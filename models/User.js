import mongoose from "mongoose";
import bcrypt from "bcrypt";


//User Shema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    photo:{
        type:String,
    },

    password:{
        type:String,
        required:true,
    }
}, {timestamps:true});


//before register user, hash password
userSchema.pre('save', async function (next) {  
    
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.passwordValidate = async function (password) {  
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;