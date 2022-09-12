const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const { createError } = require("../error");

exports.signUp = async (req, res, next) => {
  try {
    const hashed = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashed });
    await newUser.save();
    res.status(200).json({ message: "User has been created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(
        createError(400, "Email / Password field should not be empty")
      );
    }

    let isUser = await User.findOne({ email: req.body.email });

    if (!isUser) {
      return next(createError(404, "user not found"));
    }

    const passMatch = bcrypt.compareSync(req.body.password, isUser.password);

    if (!passMatch) {
      return next(createError(400, "Wrong credentials"));
    }

    const accessToken = jwt.sign(
      { email: isUser.email },
      process.env.TOKEN_KEY,
      { expiresIn: "60m" }
    );

    let session = req.session;
    session.userId = isUser._id;
    session.userEmail = isUser.email;
    session.isLoggedIn = true;
    session.accessToken = accessToken;

    const { password, ...others } = isUser._doc;

    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

exports.logoutController = async (req, res, next) => {
  try {
    let session = req.session;
    if (session.isLoggedIn) {
      req.session.destroy(() => {
        session = null;
        console.log(session);
        res.redirect("/");
      });
      console.log("logged out");
    }
  } catch (err) {
    next(err);
  }
};
