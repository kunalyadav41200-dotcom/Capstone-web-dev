const mongoose=require('mongoose');
module.exports=mongoose.model('RefreshToken',new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},tokenHash:{type:String,required:true,unique:true},expiresAt:{type:Date,required:true}},{timestamps:true}));
