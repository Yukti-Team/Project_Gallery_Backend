const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./database/connection");
const UserSc = require('./schema/user_schema');

const app = express();

const userRouter = require("./Routers/userRouter");
const projectRouter = require("./Routers/projectRouter");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

connectDatabase();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  await db.collection("users").createIndex({ username: 1, email: 1 }, { unique: true });
});


app.get("/users", async (req, res) => {
  let data = await UserSc.find();

  res.status(200).send(data);
})

app.get('/test', (req, res) => {
  res.status(200).send({
    "status code": res.statusCode,
    "message": 'Successfully tested!'
  });
});

app.use("/project", projectRouter);
app.use("/user", userRouter);

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});
