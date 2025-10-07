import pool from "../config/database.js";

export const playersController = {
  create: async (req, res) => {
    try {
      const { full_name, date_of_birth, position, team_id, jersey_number } =
        req.body;
      const { rows } = await pool.query(
        `INSERT INTO players (full_name, date_of_birth, position, team_id, jersey_number)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [full_name, date_of_birth, position, team_id, jersey_number]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM players`);
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
        `UPDATE players SET ${fields.join(
          ", "
        )} WHERE player_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM players WHERE player_id=$1`, [
        req.params.id,
      ]);
      res.json({ message: `Player ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
