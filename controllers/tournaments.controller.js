import pool from "../config/database.js";

export const tournamentsController = {
  create: async (req, res) => {
    try {
      const { tournament_name, start_date, end_date, status } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO tournaments (tournament_name, start_date, end_date, status)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tournament_name, start_date, end_date, status]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM tournaments`);
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
        `UPDATE tournaments SET ${fields.join(
          ", "
        )} WHERE tournament_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM tournaments WHERE tournament_id=$1`, [
        req.params.id,
      ]);
      res.json({ message: `Tournament ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
