const mongoose=require('mongoose');
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,default:''},price:{type:Number,required:true,min:0},category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},seller:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},stock:{type:Number,required:true,min:0,default:0},sku:{type:String,unique:true,sparse:true},isActive:{type:Boolean,default:true}},{timestamps:true});
schema.index({name:'text',description:'text'}); schema.index({category:1,price:1}); schema.index({seller:1});
module.exports=mongoose.model('Product',schema);
