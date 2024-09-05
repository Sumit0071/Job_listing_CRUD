import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
        name: { type: String, required: true,trim:true },
        points: { type: Number,default:0 },
        githubLink: { type: String, required: true, trim: true },
        password:{type:String,required:true,}
    }
)
const UserModel = mongoose.model( "User", UserSchema );
export default UserModel;