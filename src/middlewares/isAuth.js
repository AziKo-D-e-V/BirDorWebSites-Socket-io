const jwt = require("../utils/jwt");

const isAuth = (req, res, next) => {
  try {
    const {token} = req.cookies;

    if (!token) return res.redirect("/login");

    const verify = jwt.verify(token);

    req.user = verify;

    next();
  } catch (error) {
    res.redirect("/login");
  }
};

module.exports = isAuth;
