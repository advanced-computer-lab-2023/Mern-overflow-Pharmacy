import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from "body-parser";
// import adminstratorController from "./controllers/AdminstratorController.js";
// import medicineController from "./controllers/medicineController.js";
// import patientController from "./controllers/PatientController.js";
// import pharmacistController from "./controllers/pharmacistController.js";
import config from "./config/config.js";
import cors from 'cors'

import authRouter from "./routes/Auth.js";
import adminRouter from "./routes/Adminstrator.js";
import medicineRouter from "./routes/Medicines.js"
import patientRouter from "./routes/Patients.js"
import pharmacistRouter from './routes/Pharmacists.js';
import cookieParser from "cookie-parser";

mongoose.set("strictQuery", false);


// dotenv.config();
const MongoURI: string = "mongodb+srv://dbuser:987654321@acl.n4q8ykx.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "http://127.0.0.1"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const port: number = config.server.port || 8000;
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static('./src/uploads'));


const mongoUrl: string = process.env.MONGO_URI!;


app.use(bodyParser.json());

//ROUTES
app.use("/auth", authRouter);
app.use("/adminstrators", adminRouter);
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


