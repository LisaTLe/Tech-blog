const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Comment;
