import express from "express";
import { Request, Response } from "express";

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
import medicineRouter from "./routes/Medicines.js";
import patientRouter from "./routes/Patients.js";
import pharmacistRouter from "./routes/Pharmacists.js";
import cartRouter from "./routes/Cart.js";
import orderRouter from "./routes/Order.js";
import cookieParser from "cookie-parser";
import paymentRouter from "./routes/Payment.js";
import walletPaymentRouter from "./routes/WalletPayment.js";
import cashOnDeliveryRouter from "./routes/cashOnDelivery.js";

import multer from "multer";
import path from "path";
import Medicine from "./models/medicine.js";
import userRoutes from "./routes/User.js";
//const chatRoutes = require("./routes/chatRoutes");
import chatRoutes from "./routes/chatRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";

mongoose.set("strictQuery", false);

// dotenv.config();
const MongoURI: string = "mongodb+srv://dbuser:987654321@acl.n4q8ykx.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const corsOptions = {
    origin: ["http://localhost:3001", "http://127.0.0.1"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));

const port: number = config.server.port || 8001;
app.use(bodyParser.json());

app.use(cookieParser());
app.use("/images", express.static("./images"));
app.use("/uploads", express.static("./src/uploads"));

const mongoUrl: string = process.env.MONGO_URI!;

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
app.use("/cashOnDelivery", cashOnDeliveryRouter);

// chat use apis
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
    res.send("hello");
});

app.use(cors({ origin: "http://localhost:3001" }));

let server;

//code for image upload

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, "./images");
    },
    filename: (req: any, file: { fieldname: string; originalname: any }, cb: (arg0: null, arg1: string) => void) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// app.post('/upload', upload.single('file'), (req, res) => {
//   UserModel.create({image:req.file.filename})
//   .then(result=> res.json(result))
//   .catch (err =>console.log(err))
// })

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            throw new Error("No file uploaded.");
        }

        Medicine.create({ image: req.file.filename })
            .then((result) => res.json(result))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Error storing image in the database." });
            });
    } catch (error) {
        console.error(error);
    }
});

mongoose
    .connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!");
        // Starting server
    })
    .catch((err) => console.log(err));
server = app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

import { Server } from "socket.io";
import axios from "axios";

console.log(server);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3001"
        // credentials: true,
    }
});

io.on("connection", (socket: any) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData: any) => {
        socket.join(userData);
        socket.emit("connected");
    });

    socket.on("join chat", (room: any) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room: any) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved: any) => {
        console.log("HALLOO " + newMessageRecieved);
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user: any) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    // we added parameter userData (to be reviewed)
    socket.off("setup", (userData: any) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData);
    });
});

export default app;
