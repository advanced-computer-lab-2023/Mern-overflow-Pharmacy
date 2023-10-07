import { Request, Response } from "express";
import medicine from "../models/medicine.js";

const listMedicines = async(req:Request, res:Response)=>{
    //view a list of all available medicines (including picture of medicine, price, description)
}

const readMedicine = async(req:Request, res:Response)=>{
    //view the available quantity, and sales of each medicine
}

const searchMedicine = async(req:Request, res:Response)=>{
    //search for medicine based on name
}

const filterMedicines = async(req:Request, res:Response)=>{
    //filter medicines based on medicinal use
}

const createMedicine = async(req:Request, res:Response)=>{
    //add a medicine with its details (active ingredients) , price and available quantity 
}

const updateMedicine = async(req:Request, res:Response)=>{
    //edit medicine details and price
    //Medicine quantities should update automatically
}


export default {
    listMedicines,
    readMedicine,
    searchMedicine,
    filterMedicines,
    createMedicine,
    updateMedicine
  };