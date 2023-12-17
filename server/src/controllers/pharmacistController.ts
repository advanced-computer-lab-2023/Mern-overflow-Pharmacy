import { Request, Response } from "express";
import Pharmacist from "../models/pharmacist.js";
import multer from "multer";
import axios from "axios";
import CircularJSON from 'circular-json';
const createPharmacist = async (req: Request, res: Response) => {
    //submit a request to register as a pharmacist
    const data = req.body.datatoserver;
    const dataToServer = JSON.parse(data);
    console.log("i am here");
    const entry = Pharmacist.find({ username: dataToServer.username }).then((document) => {
        if (document.length === 0) {
            Pharmacist.find({ email: dataToServer.email }).then((emailRes) => {
                if (emailRes.length !== 0) res.status(404).send("You are already registered, please sign in.");
                else {
                    dataToServer.wallet = 0;
                    const files = req.files as Express.Multer.File[];
                    console.log("Files:", files);
                    console.log("additional Field: " + data);
                    console.log("additional Field2: " + dataToServer.name);
                    const documents = [];
                    if (files !== undefined) {
                        for (const file of files) {
                            const fileInfo = {
                                filename: file.originalname,
                                path: file.path
                            };
                            documents.push(fileInfo);
                        }
                    }
                    console.log("DOCUMENTS: " + JSON.stringify(documents));
                    dataToServer.status = "pending";

                    dataToServer.files = documents;

                    console.log("Modified Data:", JSON.stringify(dataToServer));
                    const newPharmacist = Pharmacist.create(dataToServer)
                        .then((newPharmacist) => {
                            res.status(200).json(newPharmacist);
                        })
                        .catch((err) => {
                            res.status(400).json(err);
                            console.log(err);
                        });
                }
            });
        } else if (document.length !== 0) res.status(400).send("Username taken, please choose another one.");
    });
};

const listPharmacistRequests = async (req: Request, res: Response) => {
    //view all of the information uploaded by a pharmacist (with pending requests) to apply to join the platform
    Pharmacist.find({ status: { $in: ["pending", "rejected"] } })
        .then((pharm) => {
            res.status(200).send(pharm);
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
};

const acceptPharmacist = async (req: Request, res: Response) => {
    //accepting a pharmacist's request
    const id = req.params.id;
    const query = { _id: id };
    const pharm = await Pharmacist.findById({ _id: id })
        .then((pharm) => {
            const update: { [key: string]: any } = {};
            if (pharm!.status === "pending") update["status"] = "accepted";
            Pharmacist.findOneAndUpdate(query, update, { new: true }).then((updatedPharm) => {
                if (updatedPharm) {
                    res.status(200).send(updatedPharm);
                }
            });
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const listPharmacists = async (req: Request, res: Response) => {
    //view all of the information uploaded by a pharmacist (with approved requests) to select one of them to view his info
    const pharm = Pharmacist.find({})
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
};

const readPharmacist = async (req: Request, res: Response) => {
    //view a pharmacist's information
    const id = req.params.id;
    const pharm = Pharmacist.findById(id)
        .then((pharm) => res.status(200).json(pharm))
        .catch((err) => {
            res.status(400).json(err);
        });
};

const listAllPharmacists = async (req: Request, res: Response) => {
    //view a pharmacist's information
    Pharmacist.find({})
        .then((pharm) => res.status(200).json(pharm))
        .catch((err) => {
            res.status(400).json(err);
        });
};

const deletePharmacist = async (req: Request, res: Response) => {
    //remove a pharmacist from the system
    const id = req.params.id;
    const pharm = Pharmacist.findByIdAndDelete({ _id: id })
        .then((pharm) => {
            res.status(200).json(pharm);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const chatWithContacts = async (req: Request, res: Response) => {
  
  const search = req.params.search;

  
  if (!search) res.status(400).send("No search text.");

  else if(search!==undefined && search!==null && typeof search == "string") {
      const all:any [] = (await axios.get("http://localhost:8000/doctors")).data;
      console.log("Response doctors: "+all);
      const docs: any[] = [];
      for (const doc of all) {

      if((doc?.name)?.includes(search)) docs.push(doc);
      }
      console.log(docs);
      res.status(200).send(docs);
  }

};


const getAllMyContacts = async (req: Request, res: Response) => {
  

      const all:any [] = await axios.get("http://localhost:8000/doctors");

      console.log(all);
      res.status(200).send(CircularJSON.stringify(all));

};




export default {
  createPharmacist,
  listPharmacists,
  acceptPharmacist,
  deletePharmacist,
  listPharmacistRequests,
  readPharmacist,
  listAllPharmacists,
  chatWithContacts,
  getAllMyContacts
};
