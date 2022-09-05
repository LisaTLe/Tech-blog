const { User } = require("../models");

const userData = [
  {
    username: "test_123",
    password: "test123",
    github: "test123",
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUser;
