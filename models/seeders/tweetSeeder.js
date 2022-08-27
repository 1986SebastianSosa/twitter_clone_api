const Tweet = require("../Tweet");
const { faker } = require("@faker-js/faker");
const User = require("../User");

const tweetSeeder = async () => {
  const users = await User.find();

  for (let user of users) {
    let tweetAmount = Math.floor(Math.random() * 10 + 1);

    for (let i = 0; i < tweetAmount; i++) {
      let userToUpdate = await User.findById(user.id);
      let tweet = await Tweet.create({
        author: userToUpdate.id,
        content: faker.lorem.paragraph(1),
        createdOn: new Date(),
      });

      if (!userToUpdate.tweets) {
        await userToUpdate.updateOne({ tweets: [tweet.id] });
        console.log("user updated");
      } else {
        await userToUpdate.updateOne({
          tweets: [...userToUpdate.tweets, tweet.id],
        });
        console.log("user updated");
      }
    }
  }
};

module.exports = tweetSeeder;
