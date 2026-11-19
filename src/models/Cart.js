const mongoose=require('mongoose');
module.exports=mongoose.model('Cart',new mongoose.Schema({customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',unique:true,required:true},items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},quantity:{type:Number,min:1,default:1}}]},{timestamps:true}));
