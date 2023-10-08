import express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import axios from "axios";
import bodyParser from "body-parser";
import adminstratorController from "./controllers/AdminstratorController.js";
import medicineController from "./controllers/medicineController.js";
import patientController from "./controllers/PatientController.js";
import pharmacistController from "./controllers/pharmacistController.js";
import config from "./config/config.js";

mongoose.set("strictQuery", false);


// dotenv.config();
const MongoURI: string ="mongodb+srv://dbuser:987654321@acl.n4q8ykx.mongodb.net/?retryWrites=true&w=majority" ;
  const app = express();
  const port: number = config.server.port || 8000;
  app.use(bodyParser.json());

const mongoUrl:string = process.env.MONGO_URI!;


app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
  console.log("hello, world!");
});

app.get("/medicines/viewAll", medicineController.listAllMedicines);
app.get("/medicines/view", medicineController.listMedicines);
app.get("/medicines", medicineController.readMedicine);
app.get("/medicines/search", medicineController.searchMedicineByName);
app.get("/medicines/filter", medicineController.filterMedicines);
app.get("/patients", patientController.listPatients);
app.get("/patients/:id", patientController.readPatient);
app.get("/pharmacists", pharmacistController.listPharmacists);
app.get("/pharmacists/:id", pharmacistController.readPharmacist); 
app.get("/pharmacists/requests", pharmacistController.listPharmacistRequests);

//POST
app.post("/adminstators", adminstratorController.createAdminstrator);
app.post("/medicines", medicineController.createMedicine);
app.post("/patients", patientController.createPatient);
app.post("/pharmacists", pharmacistController.createPharmacist);




//PUT
app.put("/medicines/:id", medicineController.updateMedicine)
app.put("/pharmacists/:id", pharmacistController.updatePharmacist);


//DELETE
app.delete("/patients/:id", patientController.deletePatient);
app.delete("/pharmacists/:id", pharmacistController.deletePharmacist);




mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

export default app;

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, World! This is your Express server.');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// testDatabaseConnection();

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(mongoUrl);

//   const schema = new mongoose.Schema({
// 	name: String,
// 	age: Number,
//   });

//   const User = mongoose.model('User', schema);

//   // Create a new user document
//   const newUser = new User({ name: 'John', age: 30 });

//   // Save the user document to the database
//   await newUser.save();

//   console.log('Document inserted:', newUser);

//   // Query the database for a user document
//   const queryResult = await User.findOne({ name: 'John' });

//   console.log('Document found:', queryResult);

// }

