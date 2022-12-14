const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");

//GET request for homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
    include: [User],
  })
    .then((dbPostData) => {
      const post = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        post,
        // loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET request for login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//GET request for signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
