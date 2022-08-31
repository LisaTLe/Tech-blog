const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//GET request for all posts
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "user_id"],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET request for one post
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "user_id", "post_id", "comment_text"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  }).then((dbPostData) => {
    if (!dbPostData) {
      res.status(404).json({ message: "Post cannot be found with this ID" });
      return;
    }
  });
});

//GET request to create new post
router.get("/create", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username", "github"],
        },
      },
      {
        model: User,
        attributes: ["username", "github"],
      },
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.map((post) => post.get({ plain: true }));
      res.render("create_post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
