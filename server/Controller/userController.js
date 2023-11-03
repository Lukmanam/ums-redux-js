const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Models/userModel");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
const userRegistaion = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const spassword = await securePassword(password);
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      res.json({ alert: "This email is already exist", status: false });
    } else {
      const user = new User({
        name: name,
        email: email,
        mobile: number,
        password: spassword,
        is_admin: 0,
      });
      const userData = await user.save();
      const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log(token,'==tocken');
      
      res.json({ userData, alert: "Registration", status: true, token });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      const access = await bcrypt.compare(password, emailExist.password);
      if (access) {
        const token = jwt.sign(
          { userId: emailExist._id },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ userData: emailExist, token, status: true });
      } else {
        res.json({ alert: "Password is incorrect" });
      }
    } else {
      res.json({ alert: "No account in this email" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addProfileImage = async (req, res) => {
  try {
    const id = req.body.userId;
    const image = req.file.filename;
    const updateImg = await User.findOneAndUpdate(
      { _id: id },
      { $set: { image: image } },
      { new: true }
    ).then((response) => {
      res.json({ updated: true, data: response });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProfileImage,
  userRegistaion,
  userLogin,
};
