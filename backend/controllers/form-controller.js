import FormModel from "../models/form-model.js";
import { validations } from "../middlewares/validations.js";
export const insertFormData=async(req,res)=>
{
    const {name,surname,email,passport_no,password}=req.body;
    const NewData=FormModel({name:name,surname:surname,email:email,passport_no:passport_no,password:password});
    try {
        await NewData.save();
        res.status(200).json({message:"inserted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}