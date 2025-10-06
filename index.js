const express = require("express");
const footballRoutes = require("./routes/football.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/football", footballRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
