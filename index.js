const express = require("express");
const app = express();
const routes = require("./routes/UserRoutes");
const PORT = process.env.PORT || 8000;
const { connectDB, sequelize } = require("./database/db");

app.use(express.json());
app.use("/user", routes);

app.get("/check", (req, res) => {
  res.send("Server is working fine");
});

const startServer = async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(` Server is running on  http://localhost:${PORT}`);
  });
};
  
startServer();
