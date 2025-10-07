import express from "express";
import tournamentRouter from "./routes/tournaments.routes.js";
import tournamentGroupsRouter from "./routes/tournamentGroups.routes.js";
import teamsRouter from "./routes/teams.routes.js";
import footballClubsRouter from "./routes/footballClubs.routes.js";
import matchFixturesRouter from "./routes/matchFixtures.routes.js";
import playersRouter from "./routes/players.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/tournaments", tournamentRouter);
app.use("/tournament-groups", tournamentGroupsRouter);
app.use("/teams", teamsRouter);
app.use("/football-clubs", footballClubsRouter);
app.use("/match-fixtures", matchFixturesRouter);
app.use("/players", playersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
