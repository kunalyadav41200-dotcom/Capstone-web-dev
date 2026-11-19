const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, password:{type:String,required:true,minlength:8,select:false}, role:{type:String,enum:['customer','seller','admin'],default:'customer'}, isActive:{type:Boolean,default:true} },{timestamps:true});
schema.pre('save',async function(){if(this.isModified('password')) this.password=await bcrypt.hash(this.password,12);});
schema.methods.comparePassword=function(p){return bcrypt.compare(p,this.password);};
module.exports=mongoose.model('User',schema);
