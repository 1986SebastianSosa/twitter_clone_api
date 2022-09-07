const User = require("../User");

const followerSeeder = async () => {
  console.log("Creating followers...");
  const users = await User.find();

  for (let user of users) {
    let followerAmount = Math.floor(Math.random() * 50 + 1);

    for (let i = 0; i < followerAmount; i++) {
      let updatedUser = await User.findById(user.id);
      let randomUser = users[Math.floor(Math.random() * 50)];
      let updatedRandomUser = await User.findById(randomUser.id);

      if (updatedUser.id !== randomUser.id) {
        if (!updatedUser.following) {
          await updatedUser.updateOne({ following: [randomUser.id] });
          if (!updatedRandomUser.followers) {
            await updatedRandomUser.updateOne({ followers: [updatedUser.id] });
          } else {
            await updatedRandomUser.updateOne({
              followers: [...updatedRandomUser.followers, updatedUser.id],
            });
          }
        } else if (!updatedUser.following.includes(randomUser.id)) {
          await updatedUser.updateOne({
            following: [...updatedUser.following, randomUser.id],
          });
          if (!updatedRandomUser.followers) {
            await updatedRandomUser.updateOne({ followers: [updatedUser.id] });
          } else {
            await updatedRandomUser.updateOne({
              followers: [...updatedRandomUser.followers, updatedUser.id],
            });
          }
        }
      }
    }
  }
  console.log("Followers were created successfully");
};

module.exports = followerSeeder;
