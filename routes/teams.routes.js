import { Router } from "express";
import { teamsController } from "../controllers/teams.controller.js";

const router = Router();
router.get("/", teamsController.getAll);
router.post("/", teamsController.create);
router.put("/:id", teamsController.update);
router.delete("/:id", teamsController.delete);

export default router;
