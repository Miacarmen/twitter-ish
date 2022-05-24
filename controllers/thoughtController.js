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
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then(async (thoughtData) => {
        !thoughtData ? res.status(404).json({ message: 'No thought found with that ID' }) : res.json({ thoughtData, thoughts: await thoughtData(req.params.id) })
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
        return getUsers.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { thought: _id }},
            { new: true }
        );
    })
    .then((thoughtData) => {
        !thoughtData ? res.status(404).json({ message: 'No thought found with that ID' }) : res.json(thoughtData)
    })
    .catch((err) => {
        res.status(500).json(err);
    });
},
  // UPDATE thought by ID

  // DELETE thoughts

  // CREATE a reaction

  // DELETE reaction
};
