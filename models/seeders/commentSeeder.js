const User = require("../User");
const Tweet = require("../Tweet");
const Comment = require("../Comment");
const { faker } = require("@faker-js/faker");

const commentSeeder = async () => {
  const tweets = await Tweet.find();
  const users = await User.find();
  console.log("Creating comments...");

  for (let tweet of tweets) {
    let commentAmount = Math.floor(Math.random() * 15 + 1);

    for (let i = 0; i < commentAmount; i++) {
      let tweetToUpdate = await Tweet.findById(tweet.id);
      let randomUser = users[Math.floor(Math.random() * (users.length - 1))];
      let updatedRandomUser = await User.findById(randomUser.id);

      let comment = await Comment.create({
        author: updatedRandomUser.id,
        tweet: tweet.id,
        content: faker.lorem.lines(),
        likes: likesGenerator(),
        createdOn: new Date(),
      });

      if (!updatedRandomUser.comments) {
        await updatedRandomUser.updateOne({ comments: [comment.id] });
      } else {
        await updatedRandomUser.updateOne({
          comments: [...updatedRandomUser.comments, comment.id],
        });
      }
      if (!tweetToUpdate.comments) {
        await tweetToUpdate.updateOne({ comments: [comment] });
      } else {
        await tweetToUpdate.updateOne({
          comments: [...tweetToUpdate.comments, comment],
        });
      }
    }
  }
  console.log("Comments have been created successfully");

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

module.exports = commentSeeder;
