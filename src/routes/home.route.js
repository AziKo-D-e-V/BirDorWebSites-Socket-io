const {Router} = require("express");

const isAuth = require("../middlewares/isAuth");
const { home, adminPage, page404, ShowMessage } = require("../controller/home.controller");
const { create } = require("../controller/message.controller");

const router = Router();

router.get("/", home);
router.get("/admin", isAuth, adminPage);
router.post("/new-massage", create)
router.get("/page404", isAuth, page404);
router.get("/contact-show", isAuth, ShowMessage)
router.get("/admin/logout", isAuth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
