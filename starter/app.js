const Task = require("./models/tasks");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connect = require("./db/connect");
require("dotenv").config();

// Middleware
app.use(express.static("./public"));
app.use(express.json());
//routes
app.get("/hello", (req, res) => {
  res.send("Task");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
