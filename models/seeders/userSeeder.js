const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const User = require("../User");
const password = process.env.FAKE_USERS_PASSWORD;

const userSeeder = async () => {
  let hash = await bcrypt.hash(password, 10);
  let testPass = await bcrypt.hash("12345", 10);
  const testUser = new User({
    firstname: "Sebastian",
    lastname: "Sosa",
    username: "Timetoarrive",
    password: testPass,
    email: "seba@gmail.com",
    createdOn: new Date(),
    tweets: null,
    comments: null,
    following: null,
    followers: null,
  });
  await testUser.save();
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
    await user.save();
  }
  console.log("Users have been created successfully");
};

module.exports = userSeeder;
