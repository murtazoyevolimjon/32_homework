const pool = require("../db");

const createFootball = async (req, res) => {
  try {
    const { name, country, coach } = req.body;
    const result = await pool.query(
      "INSERT INTO teams (name, country, coach) VALUES ($1, $2, $3) RETURNING *",
      [name, country, coach]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFootball = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFootballById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM teams WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Topilmadi" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateFootball = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, coach } = req.body;
    const result = await pool.query(
      "UPDATE teams SET name = $1, country = $2, coach = $3 WHERE id = $4 RETURNING *",
      [name, country, coach, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Topilmadi" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteFootball = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM teams WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Topilmadi" });
    res.json({ deleted: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createFootball,
  getFootball,
  getFootballById,
  updateFootball,
  deleteFootball,
};
