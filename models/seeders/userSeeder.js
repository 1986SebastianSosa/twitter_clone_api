const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const User = require("../User");
const password = process.env.FAKE_USERS_PASSWORD;

const userSeeder = async () => {
  let hash = await bcrypt.hash(password, 10);
  for (let i = 0; i < 50; i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const password = hash;
    const username = faker.internet.userName(firstname);
    const email = faker.internet.email(firstname, lastname);
    const user = new User({
      firstname,
      lastname,
      username,
      password,
      email,
      createdOn: new Date(),
      tweets: null,
      comments: null,
      following: null,
      followers: null,
    });
    user.save(() => {
      console.log("Users have been created successfully");
    });
  }
};

module.exports = userSeeder;
