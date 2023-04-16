const express = require('express');
const bcrypt = require('bcrypt');
const cors = require("cors");
const connectDatabase = require("./database/connection");


const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
  extended: true
}));

const port = 3000;

connectDatabase();



const users = [];

app.get("/users", (req, res) => {
  res.status(200).send(users);
})

app.post("/user/signup", async (req, res) => {

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };

    users.push(user);

    res.status(201).send(user);

  } catch (error) {
    res.status(500).send({
      "message": "Something went wrong..."
    })

  }

})


app.post("/user/login", async (req, res) => {

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };

    users.push(user);

    res.status(201).send(user);

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
