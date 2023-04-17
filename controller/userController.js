const UserSc = require("../schema/user_schema");
const bcrypt = require('bcrypt');

exports.signUp =  async (req, res) => {
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
}



exports.login = async (req, res) => {

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
}
  


