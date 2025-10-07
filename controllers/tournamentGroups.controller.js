import pool from "../config/database.js";

export const tournamentGroupsController = {
  create: async (req, res) => {
    try {
      const { group_name, tournament_id } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO tournament_groups (group_name, tournament_id)
         VALUES ($1, $2) RETURNING *`,
        [group_name, tournament_id]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM tournament_groups`);
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
        `UPDATE tournament_groups SET ${fields.join(
          ", "
        )} WHERE group_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM tournament_groups WHERE group_id=$1`, [
        req.params.id,
      ]);
      res.json({ message: `Group ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
