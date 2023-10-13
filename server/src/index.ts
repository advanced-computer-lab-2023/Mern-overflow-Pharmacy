import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from "body-parser";
import adminstratorController from "./controllers/AdminstratorController.js";
import medicineController from "./controllers/medicineController.js";
import patientController from "./controllers/PatientController.js";
import pharmacistController from "./controllers/pharmacistController.js";
import config from "./config/config.js";
import cors from 'cors'

import adminRouter from "./routes/Adminstrator.js";
import medicineRouter from "./routes/Medicines.js"
import patientRouter from "./routes/Patients.js"
import pharmacistRouter from './routes/Pharmacists.js';

mongoose.set("strictQuery", false);


// dotenv.config();
const MongoURI: string = "mongodb+srv://dbuser:987654321@acl.n4q8ykx.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port: number = config.server.port || 8000;
app.use(bodyParser.json());
app.use(cors());

const mongoUrl: string = process.env.MONGO_URI!;


app.use(bodyParser.json());

//ROUTES
app.use("/adminstators", adminRouter);
app.use("/medicines", medicineRouter);
app.use("/patients", patientRouter);
app.use("/pharmacists", pharmacistRouter);



app.get("/", (req, res) => {
  res.send("hello");
  console.log("hello, world!");
});



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


