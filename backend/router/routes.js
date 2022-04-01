import { insertFormData } from "../controllers/form-controller.js";
import express  from "express";
import { validations } from "../middlewares/validations.js";
const form_router=express.Router();
form_router.post('/insert',validations,insertFormData)


export default form_router