Create database people;



CREATE TABLE tournaments (
  tournament_id SERIAL PRIMARY KEY,
  tournament_name VARCHAR(100),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20)
);

CREATE TABLE tournament_groups (
  group_id SERIAL PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL UNIQUE,
  tournament_id INT REFERENCES tournaments(tournament_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL,
  club_id INT UNIQUE,
  group_id INT REFERENCES tournament_groups(group_id),
  coach_name VARCHAR(100)
);

CREATE TABLE football_clubs (
  club_id SERIAL PRIMARY KEY,
  club_name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(100),
  founded_year INT
);

CREATE TABLE match_fixtures (
  match_id SERIAL PRIMARY KEY,
  match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  venue VARCHAR(100),
  home_team_id INT REFERENCES teams(team_id),
  away_team_id INT REFERENCES teams(team_id),
  home_score INT,
  away_score INT,
  tournament_id INT REFERENCES tournaments(tournament_id),
  match_status VARCHAR(20)
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  full_name VARCHAR(100),
  date_of_birth DATE,
  position VARCHAR(50),
  team_id INT REFERENCES teams(team_id),
  jersey_number INT
);
