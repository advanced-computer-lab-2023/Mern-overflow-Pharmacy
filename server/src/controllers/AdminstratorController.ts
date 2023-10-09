import { Request, Response } from "express";
import adminstrator from "../models/Adminstrator.js";
import pharmacist from "../models/pharmacist.js";
import patient from "../models/Patient.js";


const createAdminstrator = async(req:Request, res:Response)=>{
        //add another adminstrator with a set username and password
        // missing authentication part
        req.body.username = "admin";
        req.body.passwordHash = "admin";
        const newAdminstrator = adminstrator
        .create(req.body)
        .then((newAdminstrator) => {
        res.status(200).json(newAdminstrator);
        })
        .catch((err) => {
        console.log("error");
        res.status(400).json(err);
        });
}
const deleteAdmin = async (req: Request, res: Response) => {
    const id = req.params.id;
    const newAdminstrator = adminstrator
      .findByIdAndDelete({ _id: id })
      .then((newAdminstrator) => {
        res.status(200).json(newAdminstrator);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  const ListAllAdmins = async (req: Request, res: Response) => {
    adminstrator.find({}).then((results) => {
        res.status(200).send(results);
    }).catch((err)=>{
        res.status(400).send(err);
    })
  };

  


export default{
  createAdminstrator,
  deleteAdmin,
  ListAllAdmins
}







