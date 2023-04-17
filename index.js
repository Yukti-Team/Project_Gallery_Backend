const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const cors = require("cors");
const connectDatabase = require("./database/connection");

const UserSc = require('./schema/user_schema');


const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
  extended: true
}));

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


app.post("/user/signup", async (req, res) => {
  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    try {
      let dataToStore = await UserSc.create(user);
      res.status(200).json(dataToStore);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          status: "error",
          message: "Email or username already exists",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong...",
    });
  }
});



app.post("/user/login", async (req, res) => {

  const { email, password } = req.body;


  const user = await UserSc.findOne({ email });
  if (user == null) {
    res.status(400).send({
      "message": "Invalid email or password"
    })
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send(user);
    } else {
      res.send("Not allowed");
    }

  } catch (error) {
    res.status(500).send({
      "message": "Something went wrong..."
    })
  }

})



app.get('/test', (req, res) => {
  res.send('Successfully tested!');
});

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});
