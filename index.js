// libraries
const express = require("express");
const app = express();
const cors = require("cors");

// files
const routes = require("./routes/UserRoutes");
const { connectDB, sequelize } = require("./database/db");
const {
  user,
  role,
  service,
  servicename,
  servicedescription,
  expert,
} = require("./model/indexmodel");
const PORT = process.env.PORT || 8001;

app.use(cors({ credentials: true, origin: `http://localhost:5173` }));
app.use(express.json());
app.use("/user", routes);

app.get("/check", (req, res) => {
  res.send("Server is working fine");
});

const startServer = async () => {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(` Server is running on  http://localhost:${PORT}`);
  });
};

startServer();
