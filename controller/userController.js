const userSc = require("../schema/user_schema");
const bcrypt = require('bcrypt');

// Route for checking if username is unique
exports.checkUserName = async (req, res) => {
  try {
    const user = await userSc.findOne({ username: req.body.username });
    if (user) {
      res.json({ success: false, message: 'Username is already taken' });
    } else {
      res.json({ success: true, message: 'Username is available' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    try {
      let dataToStore = await userSc.create(req.body);
      dataToStore = dataToStore.toObject();
      delete dataToStore.password;
      console.log(dataToStore);
      res.status(200).json({
        statusCode: 200,
        user: dataToStore
      });


    } catch (error) {
      if (error.code === 11000) {
        res.status(401).json({
          statusCode: 401,
          message: "userSc with this email already exists please try to login",
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
}

exports.login = async (req, res) => {
  const searchQuery = req.body.email; // It can be email/username
  const password = req.body.password;

  const user1 = await userSc.findOne({ email: searchQuery });
  const user2 = await userSc.findOne({ username: searchQuery });

  if (user1 === null && user2 === null) {
    return res.status(400).send({
      statusCode: 400,
      message: "Invalid email or password",
    });
  }
  try {
    const user = (user1 === null) ? user2 : user1;

    console.log(user);

    if (await bcrypt.compare(password, user.password)) {
      const userObject = user.toObject();
      delete userObject.password;
      console.log(userObject);
      return res.status(200).send({
        user: userObject,
        statusCode: 200,
      });
    } else {
      return res.status(401).send({
        statusCode: 401,
        message: "Username or Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.getUser = async (req, res) => {

  let id = req.params.id;

  if (id === "all") {
    let data = await userSc.find();
    res.status(200).json(data);
  }
  else {
    let data = await userSc.findOne({ _id: id });
    if (data == null) {
      res.status(400).send({
        "message": "Invalid id"
      })
    }
    try {
      res.status(200).send(data);

    } catch (error) {
      res.status(500).send({
        "message": "Something went wrong..."
      })
    }

  }
}

exports.updateUser = async (req, res) => {
  // update api using patch

  let id = req.params.id;
  let updatedData = req.body;

  let options = { new: true };

  try {
    const data = await userSc.findByIdAndUpdate(id, updatedData, options);

    res.status(201).send(data);
  } catch (error) {
    res.status().send(error.message);
  }
}

exports.deleteUser = async (req, res) => {
  let id = req.params.id;

  if (id === "all") {
    const data = await userSc.deleteMany({});
    res.status(200).send({
      data
    });
  }
  else {
    try {
      const data = await userSc.findByIdAndDelete(id);
      res.json({
        "status_code": 204,
        "status": `Deleted the user ${data.username} with id ${data.id} from db`,
      });
    }
    catch (error) {
      console.log(error);
      res.status(404).json({
        message: "Not found "
      })
    }
  }
}
