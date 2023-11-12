import express from "express";
import { Request, Response } from 'express';

import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
// import adminstratorController from "./controllers/AdminstratorController.js";
// import medicineController from "./controllers/medicineController.js";
// import patientController from "./controllers/PatientController.js";
// import pharmacistController from "./controllers/pharmacistController.js";
import config from "./config/config.js";
import cors from "cors";

import authRouter from "./routes/Auth.js";
import adminRouter from "./routes/Adminstrator.js";
import medicineRouter from "./routes/Medicines.js"
import patientRouter from "./routes/Patients.js"
import pharmacistRouter from './routes/Pharmacists.js';
import cartRouter from './routes/Cart.js'
import orderRouter from './routes/Order.js'
import cookieParser from "cookie-parser";
import paymentRouter from "./routes/Payment.js";
import walletPaymentRouter from "./routes/WalletPayment.js";
import multer from 'multer';
import path from 'path';
import Medicine from './models/medicine.js';

mongoose.set("strictQuery", false);

// dotenv.config();
const MongoURI: string =
  "mongodb+srv://dbuser:987654321@acl.n4q8ykx.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1", "http://localhost:3000/patient/checkout"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const port: number = config.server.port || 8000;
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/images", express.static('./images'))
app.use("/uploads", express.static('./src/uploads'));


const mongoUrl: string = process.env.MONGO_URI!;

app.use(bodyParser.json());

//ROUTES
app.use("/auth", authRouter);
app.use("/adminstrators", adminRouter);
app.use("/medicines", medicineRouter);
app.use("/patients", patientRouter);
app.use("/pharmacists", pharmacistRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/create-checkout-session", paymentRouter);
app.use("/walletPayment", walletPaymentRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

//code for image upload 

const storage= multer.diskStorage({
  destination: (req: any,file: any,cb: (arg0: null, arg1: string) => void) =>{
    cb(null,'./images')
  },
  filename:(req: any,file: { fieldname: string; originalname: any; },cb: (arg0: null, arg1: string) => void) =>{
    cb(null, file.originalname);
  }

})

const upload = multer({
  storage:storage
})



// app.post('/upload', upload.single('file'), (req, res) => {
//   UserModel.create({image:req.file.filename})
//   .then(result=> res.json(result))
//   .catch (err =>console.log(err))
// })

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    Medicine.create({ image: req.file.filename})
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error storing image in the database.' });
      });
  } catch (error) {
    console.error(error);  }
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
