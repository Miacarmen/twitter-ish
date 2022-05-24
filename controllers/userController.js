const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find({})
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then(async (userData) => {
        return res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // GET a single user by its `_id`
  // Populated with thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then(async (userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json({ userData, thoughts: await thought(req.params.id) })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // CREATE new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // UPDATE a user by `_id`
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: req.body },
      { runValidators: true, new: true }
    )
      .then(async (userData) => {
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // DELETE a user by `_id`
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
