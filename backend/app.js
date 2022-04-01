import express  from "express";
import cors from 'cors';
import form_router from "./router/routes.js";
const myapp=express();
myapp.use(cors());
myapp.use(express.json())
myapp.use(form_router)

export default myapp;