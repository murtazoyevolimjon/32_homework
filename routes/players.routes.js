import { Router } from "express";
import { playersController } from "../controllers/players.controller.js";

const router = Router();
router.get("/", playersController.getAll);
router.post("/", playersController.create);
router.put("/:id", playersController.update);
router.delete("/:id", playersController.delete);

export default router;
