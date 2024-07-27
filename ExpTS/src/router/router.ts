import { Router } from "express";

import mainController from "../controllers/main"
import majorController from "../controllers/major"

const router = Router();

// Major Controller
router.get("/major/", majorController.index);
router.get("/major/create", majorController.create);
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/", majorController.update);
router.post("/major/", majorController.update);
router.post("/major/", majorController.remove);

// Main Controller
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4)
router.get("/bem-vindo/:nome", mainController.bemvindo)
router.get("/lorem/:paragrafos", mainController.paragrafos)
router.get("/about", mainController.about);
router.get("/", mainController.hello);

export default router;
