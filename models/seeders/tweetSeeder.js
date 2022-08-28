const User = require("../User");
const Tweet = require("../Tweet");
const { faker } = require("@faker-js/faker");

const tweetSeeder = async () => {
  const users = await User.find();

  for (let user of users) {
    let tweetAmount = Math.floor(Math.random() * 10 + 1);

    for (let i = 0; i < tweetAmount; i++) {
      let userToUpdate = await User.findById(user.id);

      let tweet = await Tweet.create({
        author: userToUpdate.id,
        content: faker.lorem.paragraph(1),
        comments: null,
        likes: likesGenerator(),
        createdOn: new Date(),
      });

      if (!userToUpdate.tweets) {
        await userToUpdate.updateOne({ tweets: [tweet.id] });
      } else {
        await userToUpdate.updateOne({
          tweets: [...userToUpdate.tweets, tweet.id],
        });
      }
    }
  }
  console.log("Tweets have been created successfully");

  function likesGenerator() {
    let likesAmount = Math.floor(Math.random() * 50 + 1);
    const likesArray = [];

    for (let i = 0; i < likesAmount; i++) {
      let randomUser = users[Math.floor(Math.random() * (users.length - 1))];
      likesArray.find((element) => element === randomUser.id)
        ? null
        : likesArray.push(randomUser.id);
    }
    return likesArray;
  }
};

module.exports = tweetSeeder;
