const { sequelize, User, Tweet, Comment } = require("./models");

module.exports = async () => {
  await sequelize.sync({ force: true });
  console.log("The tables were created successfully");
};
