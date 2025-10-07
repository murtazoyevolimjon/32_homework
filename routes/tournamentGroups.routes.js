import { Router } from "express";
import { tournamentGroupsController } from "../controllers/tournamentGroups.controller.js";

const router = Router();
router.get("/", tournamentGroupsController.getAll);
router.post("/", tournamentGroupsController.create);
router.put("/:id", tournamentGroupsController.update);
router.delete("/:id", tournamentGroupsController.delete);

export default router;
