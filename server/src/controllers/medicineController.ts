import { Request, Response } from "express";
import medicine from "../models/medicine.js";

const listMedicines = async(req:Request, res:Response)=>{
    //view a list of all available medicines (including picture of medicine, price, description)
    medicine.find()
    .select('image price details')
    .then(
      (results) => {
        var medResults: any[]=[]; 
        for(const med of results){
             if(med.availableQuantity !== 0)
                  medResults.push(med);
        }
        res.status(200).send(medResults); })
    .catch(err => {res.status(404).send(err)
    });
}

const readMedicine = async(req:Request, res:Response)=>{
    //view the available quantity, and sales of each medicine
    const med = medicine.find()
    .select('availableQuantity sales')
    .then(med => { res.status(200).send(med); })
    .catch(err => {res.status(404).send(err)
    });
}

// const searchMedicineByName = async (req: Request, res: Response) => {
    
  
//   const medname = req.body.name;
  
  
//   try {
//     var medList: any[] = [];
//     var medResults: any[] = [];
//     const meds = medicine.find({}).then((meds)=>{
//         for (const med of meds){
//           medList.push(med.name);
//         }
//       })

//     if(medList.length===0)
//       res.status(404).send("no medicines");
//     else{

//       for(const medicine of medList){
//         if(medicine.name.includes(medname))
//           medResults.push(medicine);
//       }
      
//       if(medResults.length === 0)
//         res.status(404).send("no medicines found with this name ");
//       else{
//         res.status(200).json(medResults);
//       }
  
//     }

//   }catch(err){
//     res.status(400).json(err);
//   }

// };



const searchMedicineByName = async (req: Request, res: Response) => {
  const medname = req.body.name;

  try {
    // Fetch medicines from the database and await the result
    const meds = await medicine.find({});

    if (meds.length === 0) {
      res.status(404).send("No medicines");
    } else {
      const medList = meds.map((med) => med.name);
      const medResults = medList.filter((med) => med.includes(medname));

      if (medResults.length === 0) {
        res.status(404).send("No medicines found with this name");
      } else {
        res.status(200).json(medResults);
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};


const filterMedicines = async(req:Request, res:Response)=>{
  //filter medicines based on medicinal use

  const medUse = req.body.medicinalUse;
  medicine.find({ "medicinalUse": medUse }).then((results) => {
     res.status(200).send(results) 
    }).catch(err => {
       res.status(400).send(err) 
      });
}

const createMedicine = async(req:Request, res:Response)=>{
    //add a medicine with its details (active ingredients) , price and available quantity 
  try {
    if (req.body.availableQuantity === 0)
      res.status(400).send("cannot add medicine with 0 available quantity");
    else {
      const NewMedecine = await medicine.create(req.body);
      res.status(200).send(NewMedecine);
    }
  }catch (error) {
    res.status(400).send(error);
  }
}

const updateMedicine = async(req:Request, res:Response)=>{
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
    updateMedicine
  };