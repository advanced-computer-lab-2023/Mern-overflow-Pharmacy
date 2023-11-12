import express from "express";
import bodyParser from "body-parser";
import pharmacistController from "../controllers/pharmacistController.js";
import patientController from "../controllers/PatientController.js";
import adminstratorController from "../controllers/AdminstratorController.js";
import multer from "multer";


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
router.get("/", pharmacistController.listPharmacists);
router.get("/listAll", pharmacistController.listPharmacistRequests);
router.get("/viewAll", pharmacistController.listAllPharmacists);
router.get("/:id", pharmacistController.readPharmacist);

//POST
router.post("/", upload.array('files',10) , pharmacistController.createPharmacist);
router.post(
  "/acceptPharmacist",
  adminstratorController.acceptPharmacistRequest
);
router.post(
  "/rejectPharmacist",
  adminstratorController.rejectPharmacistRequest
);

//PUT
router.put("/:id", pharmacistController.acceptPharmacist);

//DELETE
router.delete("/:id", pharmacistController.deletePharmacist);

export default router;
