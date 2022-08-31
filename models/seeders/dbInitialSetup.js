const tweetSeeder = require("./tweetSeeder");
const userSeeder = require("./userSeeder");
const commentSeeder = require("./commentSeeder");
const followerSeeder = require("./followerSeeder");

const dbInitialSetup = async () => {
  await userSeeder();
  await followerSeeder();
  await tweetSeeder();
  await commentSeeder();
  console.log("Database was created");
};

module.exports = dbInitialSetup;
