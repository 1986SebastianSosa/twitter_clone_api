const User = require("../models/User");

const showAll = async (req, res) => {
  const loggedUser = await User.findById(req.params.id).populate("following");
  const users = await User.find();
  const followSuggestions = [];
  try {
    for (let user of users) {
      if (user.id !== loggedUser.id) {
        followSuggestions.push(user);
      }
    }
    res.status(200).json(followSuggestions);
  } catch (err) {
    res.status(404).json({ msg: "No user suggestions to follow were found" });
  }
};

const followUser = async (req, res) => {
  const loggedUser = await User.findById(req.headers.loggeduser);
  const userToFollow = await User.findById(req.headers.user);

  try {
    loggedUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedUser._id);
    await loggedUser.save();
    await userToFollow.save();
    res
      .status(200)
      .json({ msg: `You are now following @${userToFollow.username}` });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong. Please try again" });
  }
};

const unfollowUser = async (req, res) => {
  const loggedUser = await User.findById(req.headers.loggeduser).populate(
    "following"
  );
  const userToUnfollow = await User.findById(req.headers.user).populate(
    "followers"
  );
  try {
    const updatedLoggedUserFollowing = loggedUser.following.map((el) => {
      if (el.id && el.id !== userToUnfollow.id) {
        return el._id;
      } else {
        return;
      }
    });
    const updatedUserToUnfollowFollowers = userToUnfollow.followers.map(
      (el) => {
        if (el.id && el.id !== loggedUser.id) {
          return el._id;
        } else {
          return;
        }
      }
    );
    loggedUser.following = updatedLoggedUserFollowing;
    userToUnfollow.followers = updatedUserToUnfollowFollowers;

    await loggedUser.save();
    await userToUnfollow.save();
    res
      .status(200)
      .json({ msg: `You have unfollowed @${userToUnfollow.username}` });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong. Please try again" });
  }
};

module.exports = { showAll, followUser, unfollowUser };
