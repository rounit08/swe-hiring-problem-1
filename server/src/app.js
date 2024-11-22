const express = require("express");
const { sequelize } = require("./models");
const commandRoutes = require("./routes/commandRoutes");

const app = express();

app.use(express.json());
app.use("/api", commandRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");
    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
