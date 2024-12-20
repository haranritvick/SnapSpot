import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female','other'] },
},{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;