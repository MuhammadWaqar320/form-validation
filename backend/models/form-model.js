import mongoose from "mongoose";
const FormSchema=mongoose.Schema({
 name:{type:String,required:true},
 surname:{type:String,required:true},
 email:{type:String,required:true},
 passport_no:{type:String,required:true},
 password:{type:String,required:true},
})
const FormModel=mongoose.model('form',FormSchema)
export default FormModel;