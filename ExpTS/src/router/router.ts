import { Router } from "express";

import mainController from "../controllers/main"

const router = Router()

router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4)
router.get("/bem-vindo/:nome", mainController.bemvindo)
router.get("/lorem/:paragrafos", mainController.paragrafos)
router.get("/about", mainController.about);
router.get("/", mainController.hello);

export default router;
