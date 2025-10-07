import pool from "../config/database.js";

export const teamsController = {
  create: async (req, res) => {
    try {
      const { team_name, club_id, group_id, coach_name } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO teams (team_name, club_id, group_id, coach_name)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [team_name, club_id, group_id, coach_name]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM teams`);
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
        `UPDATE teams SET ${fields.join(
          ", "
        )} WHERE team_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM teams WHERE team_id=$1`, [req.params.id]);
      res.json({ message: `Team ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
