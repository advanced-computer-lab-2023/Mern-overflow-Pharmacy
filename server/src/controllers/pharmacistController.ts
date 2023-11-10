import { Request, Response } from "express";
import Pharmacist from "../models/pharmacist.js";


const createPharmacist = async (req: Request, res: Response) => {
  //submit a request to register as a pharmacist 
  req.body.status = "pending";
  const entry = Pharmacist.find({ 'username': req.body.username }).then((document) => {
    if (document.length === 0) {

      Pharmacist.find({ 'email': req.body.email }).then((emailRes) => {

        if (emailRes.length !== 0)
          res.status(404).send("You are already registered, please sign in.");

        else {
          const newPharmacist = Pharmacist
            .create(req.body)
            .then((newPharmacist) => {
              res.status(200).json(newPharmacist);
            })
            .catch((err) => {
              res.status(400).json(err);
              console.log(err);
            });
        }
      })
    }
    else if (document.length !== 0)
      res.status(400).send("Username taken, please choose another one.");
  })
}

const listPharmacistRequests = async (req: Request, res: Response) => {
  //view all of the information uploaded by a pharmacist (with pending requests) to apply to join the platform
  Pharmacist
    .find({"status": {$in: ["pending", "rejected"]} })
    .then((pharm) => {
      res.status(200).send(pharm);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
}

const acceptPharmacist = async (req: Request, res: Response) => {
  //accepting a pharmacist's request
  const id = req.params.id;
  const query = { _id: id };
  const pharm = await Pharmacist.findById({ _id: id }).then((pharm) => {
    const update: { [key: string]: any } = {};
    if (pharm!.status === "pending") update["status"] = "accepted";
    Pharmacist
      .findOneAndUpdate(query, update, { new: true })
      .then((updatedPharm) => {
        if (updatedPharm) {
          res.status(200).send(updatedPharm);
        }
      })
  }).catch((error) => {
    res.status(400).send(error);
  });

}

const listPharmacists = async (req: Request, res: Response) => {
  //view all of the information uploaded by a pharmacist (with approved requests) to select one of them to view his info
  const pharm = Pharmacist
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

const readPharmacist = async (req: Request, res: Response) => {
  //view a pharmacist's information
  const id = req.params.id;
  const pharm = Pharmacist
    .findById(id)
    .then((pharm) => res.status(200).json(pharm))
    .catch((err) => {
      res.status(400).json(err);
    });
}

const listAllPharmacists = async (req: Request, res: Response) => {
  //view a pharmacist's information
  Pharmacist
    .find({})
    .then((pharm) => res.status(200).json(pharm))
    .catch((err) => {
      res.status(400).json(err);
    });
}

const deletePharmacist = async (req: Request, res: Response) => {
  //remove a pharmacist from the system
  const id = req.params.id;
  const pharm = Pharmacist
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
  acceptPharmacist,
  deletePharmacist,
  listPharmacistRequests,
  readPharmacist,
  listAllPharmacists
};