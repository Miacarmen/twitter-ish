// require models
const { Thought, User } = require("../models");
const { getUsers } = require("./userController");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then(async (thoughtData) => {
        return res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET thoughts by ID
  getThoughtsById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then(async (thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json({
              thoughtData,
              thoughts: await thoughtData(req.params.id),
            });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // CREATE a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: _id } },
          { runValidators: true, new: true }
        );
      })
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // UPDATE thought by ID
  // push the created thought's `_id` to the associated user's `thoughts` array field)
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE thought by ID
  deleteThought(req, res) {
    // deletes thought
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(({ _id }) => {
        // removes deleted thought from user
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { thoughts: req.params.thoughtId } },
          { runValidators: true, new: true }
        );
      })
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // CREATE a reaction
  // stored in a single thought's `reactions` array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE reaction
  // pull and remove a reaction by the reaction's `reactionId` value
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

};
