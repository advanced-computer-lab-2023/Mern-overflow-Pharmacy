import { Request, Response } from "express";
import adminstrator from "../models/Adminstrator.js";
import Pharmacist from "../models/pharmacist.js";
import patient from "../models/Patient.js";

const createAdminstrator = async (req: Request, res: Response) => {
    //add another adminstrator with a set username and password
    // missing authentication part
    const entry = adminstrator.find({ username: req.body.username }).then((document) => {
        if (document.length === 0) {
            const newAdmin = adminstrator
                .create(req.body)
                .then((newAdmin) => {
                    res.status(200).json(newAdmin);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        } else if (document.length !== 0) res.status(400).send("username taken , please choose another one ");
    });
};

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
    adminstrator
        .find({})
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const acceptPharmacistRequest = async (req: Request, res: Response) => {
    // assuming pharmacist id passed as a parameter whenever entry is clciked from fe
    const reqid = req.body.id;
    // assuming his initial state is pending because I only get to see pending requests

    const update = {
        // Define the fields you want to update and their new values
        status: "accepted"
    };

    // Set options for the update
    const options = {
        new: true // Return the updated document after the update
    };

    // Use findOneAndUpdate to find and update the document
    const filter = { _id: reqid };
    Pharmacist.findOneAndUpdate(filter, update, options)
        .then((result) => {
            res.status(200).send("accepted");
        })
        .catch((err) => res.status(404).send(err));
};

const rejectPharmacistRequest = async (req: Request, res: Response) => {
    // assuming pharmacist id passed as a parameter whenever entry is clciked from fe
    const reqid = req.body.id;
    // assuming his initial state is pending because we only see pending pharmacists

    const update = {
        // Define the fields you want to update and their new values
        status: "rejected"
    };

    // Set options for the update
    const options = {
        new: true // Return the updated document after the update
    };

    // Use findOneAndUpdate to find and update the document
    const filter = { _id: reqid };
    Pharmacist.findOneAndUpdate(filter, update, options)
        .then((result) => {
            res.status(200).send("rejected");
        })
        .catch((err) => res.status(404).send(err));
};
export default {
    createAdminstrator,
    deleteAdmin,
    ListAllAdmins,
    acceptPharmacistRequest,
    rejectPharmacistRequest
};
