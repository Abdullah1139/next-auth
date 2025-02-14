import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    userName:{
        type: String,
        required: [true,"Please Enter a User Name"],
        unique:true
    },
    email:{
        type: String,
        required: [true,"Please Enter a Email"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"Please Enter a true"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswoordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

const User=mongoose.model.users|| mongoose.model("user",userSchema);

export default User;