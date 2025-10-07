import { Router } from "express";
import { tournamentsController } from "../controllers/tournaments.controller.js";

const router = Router();
router.get("/", tournamentsController.getAll);
router.post("/", tournamentsController.create);
router.put("/:id", tournamentsController.update);
router.delete("/:id", tournamentsController.delete);

export default router;
