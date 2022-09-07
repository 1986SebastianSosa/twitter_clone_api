const User = require("../User");
const Tweet = require("../Tweet");
const { faker } = require("@faker-js/faker");

const tweetSeeder = async () => {
  console.log("Creating tweets...");
  const users = await User.find();

  for (let user of users) {
    let tweetAmount = Math.floor(Math.random() * 10 + 1);

    for (let i = 0; i < tweetAmount; i++) {
      let userToUpdate = await User.findById(user.id);

      let tweet = await Tweet.create({
        author: userToUpdate.id,
        content: faker.lorem.paragraph(1),
        comments: null,
        likes: null,
        createdOn: faker.date.between(
          "2010-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z"
        ),
      });

      tweet.likes = await likesGenerator();
      for (let user of tweet.likes) {
        const userThatLikedTweet = await User.findById(user);
        userThatLikedTweet.tweetLikes
          ? (userThatLikedTweet.tweetLikes = [
              ...userThatLikedTweet.tweetLikes,
              tweet.id,
            ])
          : (userThatLikedTweet.tweetLikes = [tweet.id]);
        userThatLikedTweet.save();
      }
      tweet.save();
      if (!userToUpdate.tweets) {
        await userToUpdate.updateOne({ tweets: [tweet.id] });
      } else {
        await userToUpdate.updateOne({
          tweets: [...userToUpdate.tweets, tweet.id],
        });
      }
    }
  }

  async function likesGenerator() {
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
  console.log("Tweets have been created successfully");
};

module.exports = tweetSeeder;
