import pool from "../config/database.js";

export const matchFixturesController = {
  create: async (req, res) => {
    try {
      const {
        match_date,
        venue,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        tournament_id,
        match_status,
      } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO match_fixtures (match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [
          match_date,
          venue,
          home_team_id,
          away_team_id,
          home_score,
          away_score,
          tournament_id,
          match_status,
        ]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM match_fixtures`);
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
        `UPDATE match_fixtures SET ${fields.join(
          ", "
        )} WHERE match_id=$${idx} RETURNING *`,
        values
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await pool.query(`DELETE FROM match_fixtures WHERE match_id=$1`, [
        req.params.id,
      ]);
      res.json({ message: `Match ${req.params.id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
