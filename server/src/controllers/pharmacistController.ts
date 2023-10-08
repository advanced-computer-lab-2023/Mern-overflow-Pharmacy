import { Request, Response } from "express";
import pharmacist from "../models/pharmacist.js";


const createPharmacist = async(req:Request, res:Response)=>{
    //submit a request to register as a pharmacist 
    req.body.status = "pending";
    const newPharm = pharmacist
      .create(req.body)
      .then((newPharm) => {
        res.status(200).json(newPharm);
      })
      .catch((err) => {
        console.log("error");
        res.status(400).json(err);
      });
}

const listPharmacistRequests = async(req:Request, res:Response)=>{
    //view all of the information uploaded by a pharmacist (with pending requests) to apply to join the platform
    const pharm = pharmacist
      .find({})
      .then((pharm) => {
        var newPharms = [];
        for (var i = 0; i < pharm.length; i++) {
          if (pharm[i].status === "pending") newPharms.push(pharm[i]);
        }
  
        res.status(200).json(newPharms);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
}

const updatePharmacist = async(req:Request, res:Response)=>{
    //accepting a pharmacist's request
    const id = req.params.id;

    const query = { _id: id };

  const status = req.body.status;
  const update: { [key: string]: any } = {};
  if (status!==undefined) update["status"] = status;
  

    pharmacist
    .findOneAndUpdate(query, update, { new: true })
    .then((updatedPharm) => {
      if (updatedPharm) {
        res.status(200).send(updatedPharm);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });

}

const listPharmacists = async(req:Request, res:Response)=>{
    //view all of the information uploaded by a pharmacist (with approved requests) to select one of them to view his info
    const pharm = pharmacist
      .find({})
      .then((pharm) => {
        var newPharms = [];
        for (var i = 0; i < pharm.length; i++) {
          if (pharm[i].status === "accepted") newPharms.push(pharm[i]);
        }
  
        res.status(200).json(newPharms);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    
}

const readPharmacist = async(req:Request, res:Response)=>{
    //view a pharmacist's information
    const id = req.params.id;
    const pharm = pharmacist
    .findById(id)
    .then((pharm) => res.status(200).json(pharm))
    .catch((err) => {
      res.status(400).json(err);
    });
}




const deletePharmacist = async(req:Request, res:Response)=>{
    //remove a pharmacist from the system
        const id = req.params.id;
        const pharm = pharmacist
          .findByIdAndDelete({ _id: id })
          .then((pharm) => {
            res.status(200).json(pharm);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      };



export default {
    createPharmacist,
    listPharmacists,
    updatePharmacist,
    deletePharmacist,
    listPharmacistRequests,
    readPharmacist
  };