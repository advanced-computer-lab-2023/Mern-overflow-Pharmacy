import { Request, Response } from "express";
import patient from "../models/Patient.js";
import cart from "../models/Cart.js"
import pharmacist from "../models/pharmacist.js";


// register patient
// add the checking of already registered or not
const createPatient = async (req: Request, res: Response) => {
    const entry = patient.find({ username: req.body.username }).then((document) => {
        if (document.length === 0) {
            patient.find({ email: req.body.email }).then((emailRes) => {
                if (emailRes.length !== 0) res.status(404).send("You are already registered, please sign in.");
                else {
                    req.body.wallet = 0;
                    const newPatient = patient
                        .create(req.body)
                        .then((newPatient) => {
                            const newCart = cart.create({
                                patient: newPatient._id,
                                medicines: []
                            });
                            res.status(200).json(newPatient);
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

const listPatients = async (req: Request, res: Response) => {
    //view all patients to select a patient to view his basic information
    //should we do it?
    patient
        .find()
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

const readPatient = async (req: Request, res: Response) => {
    //view a patients's basic information (all information except presecriptions of the patient)
    const id = req.params.id; //id of the patient that we want to read
    const pat = patient
        .find({ _id: id })
        .select("username name email passwordHash dateOfBirth gender mobileNumber emergencyContact package")
        .then((pat) => {
            res.status(200).send(pat);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

const viewPatientInfo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const pat = patient
        .find({ _id: id })
        .select({})
        .then((pat) => {
            res.status(200).send(pat);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
};

const deletePatient = async (req: Request, res: Response) => {
    //remove a patient from the system
    const id = req.params.id;
    const pat = patient
        .findByIdAndDelete({ _id: id })
        .then((pat) => {
            res.status(200).json(pat);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const viewAddresses = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;
    try {
        const p = await patient.findOne({ _id: patientId });

        if (!p) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const addresses = p.address;
        res.status(200).json({ addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addAddress = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;
    const newAddress = req.body.newAddress;
    try {
        const existingPatient = await patient.findOne({ _id: patientId });
        if (!existingPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        existingPatient.address?.push(newAddress);
        await existingPatient.save();
        res.json({ message: 'Address added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const chatWithPharmacists = async (req: Request, res: Response) => {

    const pId = req.params.id;
    const search = req.params.search;

    if (!search) res.status(400).send("No search text.");
    else if(search!==undefined && search!==null && typeof search == "string") {

        const all: any[] = await pharmacist.find({});
        const pharmacists: any[] = [];
        
        for (const pharmacist of all) {



        if((pharmacist?.name)?.includes(search)) pharmacists.push(pharmacist);

        }
        console.log(pharmacists);
        res.status(200).send(pharmacists);
    }

  };


  const getAllMyPharmacists = async (req: Request, res: Response) => {

    const all: any[] = await pharmacist.find({});

    console.log(all);
    res.status(200).send(all);

  };


export default {
    createPatient,
    listPatients,
    readPatient,
    viewPatientInfo,
    deletePatient,
    viewAddresses,
    addAddress,
    chatWithPharmacists,
    getAllMyPharmacists
};
