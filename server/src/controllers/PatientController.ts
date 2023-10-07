import { Request, Response } from "express";
import patient from "../models/Patient.js";


const createPatient = async(req:Request, res:Response)=>{
    //register as a patient 
}

const listPatients = async(req:Request, res:Response)=>{
    //view all patients to select a patient to view his basic information
    //should we do it?
}

const readPatient = async(req:Request, res:Response)=>{
    //view a patients's basic information (all information except presecriptions of the patient)
}

const deletePatient = async(req:Request, res:Response)=>{
    //remove a patient from the system
}



export default {
    createPatient,
    listPatients,
    readPatient,
    deletePatient
  };