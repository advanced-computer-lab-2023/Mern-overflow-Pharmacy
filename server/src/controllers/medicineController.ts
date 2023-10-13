import { Request, Response } from "express";
import medicine from "../models/medicine.js";
import { log } from "console";


const listAllMedicines = async (req: Request, res: Response) => {
  medicine.find({}).then(results => { res.status(200).send(results) }).catch(err => res.status(400).send(err));
}



const listMedicines = async (req: Request, res: Response) => {
  //view a list of all available medicines (including picture of medicine, price, description)
  medicine.find()
    .select('image price details')
    .then(
      (results) => {
        var medResults: any[] = [];
        for (const med of results) {
          if (med.availableQuantity !== 0)
            medResults.push({ "image": med.image, "price": med.price, "details": med.details });
        }
        res.status(200).send(medResults);
      })
    .catch(err => {
      res.status(404).send(err)
    });
}

const readMedicine = async (req: Request, res: Response) => {
  //view the available quantity, and sales of each medicine
  const med = medicine.find()
    .select('name availableQuantity sales')
    .then(med => {
      var medResults: any[] = [];
      for (const mede of med) {
        medResults.push({ "name": mede.name, "availableQuantity": mede.availableQuantity, "sales": mede.sales });
      }
      res.status(200).send(medResults);
    })
    .catch(err => {
      res.status(404).send(err)
    });
}



const searchMedicineByName = async (req: Request, res: Response) => {
  const medname = req.body.name.toLowerCase();

  try {
    // Fetch medicines from the database and await the result
    const meds = await medicine.find({});
    //console.log(meds.length);
    if (meds.length === 0) {
      res.status(404).send("No medicines");
    } else {
      const medList = meds.map((med) => med.name.toLowerCase());
      const medResults = medList.filter((med) => med.includes(medname));
      //console.log(medResults.length);

      if (medResults.length === 0) {
        res.status(404).send("No medicines found with this name");
      } else {

        const medArr = meds.filter((med) => med.name.includes(medname));
        res.status(200).json(medArr);
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};





const filterMedicines = async (req: Request, res: Response) => {
  //filter medicines based on medicinal use

  const medUse = req.body.medicinalUse;
  medicine.find({ "medicinalUse": medUse }).then((results) => {
    console.log(results);
    if (results.length === 0) {
      res.status(404).send("no medicines found under this medicinalUse")
    } else {
      res.status(200).json(results)
    }
  }).catch(err => {
    res.status(400).send(err)
    console.log(err)
  });
}

const createMedicine = async (req: Request, res: Response) => {
  //add a medicine with its details (active ingredients) , price and available quantity 
  try {
    if (req.body.availableQuantity === 0)
      res.status(400).send("cannot add medicine with 0 available quantity");
    else {
      const NewMedecine = await medicine.create(req.body);
      res.status(200).send(NewMedecine);
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
}

const updateMedicine = async (req: Request, res: Response) => {
  //edit medicine details and price
  //Medicine quantities should update automatically
  const id = req.params.id;
  const query = { _id: id };
  const details = req.body.details;
  const price = req.body.price;
  const update: { [key: string]: any } = {};
  if (details !== undefined) update["details"] = details;
  if (price !== undefined) update["price"] = price;


  medicine
    .findOneAndUpdate(query, update, { new: true })
    .then((updatedMed) => {
      if (updatedMed) {
        res.status(200).send(updatedMed);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}


export default {
  listMedicines,
  readMedicine,
  searchMedicineByName,
  filterMedicines,
  createMedicine,
  updateMedicine,
  listAllMedicines
};