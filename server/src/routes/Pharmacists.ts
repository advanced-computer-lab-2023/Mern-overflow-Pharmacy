import express from "express";
import bodyParser from "body-parser";
import pharmacistController from "../controllers/pharmacistController.js";
import patientController from "../controllers/PatientController.js";
import adminstratorController from "../controllers/AdminstratorController.js";
import multer from "multer";


import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";
import isAuthorized from "../middlewares/permissions/isAuthorized.js";
import { UserType } from "../enums/UserTypes.js";
const router = express.Router();

router.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    }
  });
  const upload = multer({ storage: storage })

//GET
router.get("/",isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]),pharmacistController.listPharmacists);
router.get("/listAll",isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]), pharmacistController.listPharmacistRequests);
router.get("/viewAll",isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]), pharmacistController.listAllPharmacists);
router.get("/:id", pharmacistController.readPharmacist);
router.get("/chatWithContacts/:id/:search",isAuthenticated,pharmacistController.chatWithContacts);
router.get("/getAllMyContacts/:id",isAuthenticated,pharmacistController.getAllMyContacts);


//POST
router.post("/", upload.array('files',10) , pharmacistController.createPharmacist);
router.post(
  "/acceptPharmacist"
  ,isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]),
  adminstratorController.acceptPharmacistRequest
);
router.post(
  "/rejectPharmacist"
  ,isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]),
  adminstratorController.rejectPharmacistRequest
);

//PUT
router.put("/:id", pharmacistController.acceptPharmacist);

//DELETE
router.delete("/:id", pharmacistController.deletePharmacist);

export default router;
