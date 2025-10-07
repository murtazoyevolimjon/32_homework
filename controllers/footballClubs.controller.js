import pool from "../config/database.js";

export const footballClubsController = {
  create: async (req, res) => {
    try {
      const { club_name, city, country, founded_year } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO football_clubs (club_name, city, country, founded_year)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [club_name, city, country, founded_year]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM football_clubs`);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const fields = [];
      const values = [];
      let idx = 1;

      for (const [key, value] of Object.entries(req.body)) {
        fields.push(`${key}=$${idx++}`);
        values.push(value);
      }

      values.push(req.params.id);
      const { rows } = await pool.query(
        `UPDATE football_clubs SET ${fields.join(
          ", "
        )} WHERE club_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM football_clubs WHERE club_id=$1`, [
        req.params.id,
      ]);
      res.json({ message: `Club ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
