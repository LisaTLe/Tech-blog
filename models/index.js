const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User.hasMany(Post, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  constraints: false,
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  constraints: false,
});

// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

module.exports = {
  User,
  Comment,
  Post,
};
