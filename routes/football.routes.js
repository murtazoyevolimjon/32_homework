const express = require("express");
const {
  createFootball,
  getFootball,
  getFootballById,
  updateFootball,
  deleteFootball,
} = require("../controllers/football.controller");

const router = express.Router();

router.post("/", createFootball);
router.get("/", getFootball);
router.get("/:id", getFootballById);
router.put("/:id", updateFootball);
router.delete("/:id", deleteFootball);

module.exports = router;
