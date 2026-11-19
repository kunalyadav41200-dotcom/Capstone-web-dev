const mongoose=require('mongoose');
const schema=new mongoose.Schema({customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},seller:{type:mongoose.Schema.Types.ObjectId,ref:'User'},name:String,unitPrice:Number,quantity:Number}],total:Number,deliveryAddress:{type:String,required:true},payment:{method:{type:String,default:'SIMULATED'},status:{type:String,enum:['pending','paid','failed'],default:'paid'},reference:String},status:{type:String,enum:['placed','processing','shipped','delivered','cancelled'],default:'placed'}},{timestamps:true});
schema.index({customer:1,createdAt:-1}); schema.index({status:1,createdAt:-1});
module.exports=mongoose.model('Order',schema);
