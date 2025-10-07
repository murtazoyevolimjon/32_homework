import { Router } from "express";
import { matchFixturesController } from "../controllers/matchFixtures.controller.js";

const router = Router();
router.get("/", matchFixturesController.getAll);
router.post("/", matchFixturesController.create);
router.put("/:id", matchFixturesController.update);
router.delete("/:id", matchFixturesController.delete);

export default router;
