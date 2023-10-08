import { Request, Response } from "express";
import patient from "../models/Patient.js";


// register patient 
// add the checking of already registered or not 
const createPatient = async (req: Request, res: Response) => {

    const entry = patient.find({ 'username': req.body.username }).then((document) => {
        if (document.length === 0) {

            patient.find({ 'email': req.body.email }).then((emailRes) => {

                if (emailRes.length !== 0)
                    res.status(404).send("You are already registered , please sign in ");
            
                const newPatient = patient
                    .create(req.body)
                    .then((newPatient) => {
                        res.status(200).json(newPatient);
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            })
        }
        else if (document.length !== 0)

            res.status(400).send("username taken , please choose another one ");
    })

};

          
    
    
    
        

          
            
 




const listPatients = async(req:Request, res:Response)=>{
    //view all patients to select a patient to view his basic information
    //should we do it?

    patient.find().then(results => { res.status(200).send(results); }).catch(err => {res.status(404).send(err)
    });



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