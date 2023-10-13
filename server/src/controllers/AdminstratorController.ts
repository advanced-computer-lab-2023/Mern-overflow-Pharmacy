import { Request, Response } from "express";
import adminstrator from "../models/Adminstrator.js";
import pharmacist from "../models/pharmacist.js";
import patient from "../models/Patient.js";


const createAdminstrator = async(req:Request, res:Response)=>{
        //add another adminstrator with a set username and password
        // missing authentication part
        const entry = adminstrator.find({ 'username': req.body.username }).then((document) => {
          if (document.length === 0) {
    
            const newAdmin = adminstrator
            .create(req.body)
            .then((newAdmin) => {
                res.status(200).json(newAdmin);
            })
            .catch((err) => {
                res.status(400).json(err);
            });

          }
          else if (document.length !== 0)
              res.status(400).send("username taken , please choose another one ");
      })
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







