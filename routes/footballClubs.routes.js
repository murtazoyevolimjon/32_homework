import { Router } from "express";
import { footballClubsController } from "../controllers/footballClubs.controller.js";

const router = Router();
router.get("/", footballClubsController.getAll);
router.post("/", footballClubsController.create);
router.put("/:id", footballClubsController.update);
router.delete("/:id", footballClubsController.delete);

export default router;
