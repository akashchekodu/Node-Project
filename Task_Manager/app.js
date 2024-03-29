const Task = require("./models/tasks");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connect = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;
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
