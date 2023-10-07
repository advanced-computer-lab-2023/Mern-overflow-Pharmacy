import { Request, Response } from "express";
import pharmacist from "../models/pharmacist.js";


const createPharmacist = async(req:Request, res:Response)=>{
    //submit a request to register as a pharmacist 
}

const listPharmacistRequests = async(req:Request, res:Response)=>{
    //view all of the information uploaded by a pharmacist (with pending requests) to apply to join the platform
}

const updatePharmacist = async(req:Request, res:Response)=>{
    //accepting a pharmacist's request
}

const listPharmacists = async(req:Request, res:Response)=>{
    //view all of the information uploaded by a pharmacist (with approved requests) to select one of them to view his info
}

const readPharmacist = async(req:Request, res:Response)=>{
    //view a pharmacist's information
}




const deletePharmacist = async(req:Request, res:Response)=>{
    //remove a pharmacist from the system
}


export default {
    createPharmacist,
    listPharmacists,
    updatePharmacist,
    deletePharmacist,
    listPharmacistRequests,
    readPharmacist
  };