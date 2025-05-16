import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({

    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
        password:{
            type:String,
            required:true
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;