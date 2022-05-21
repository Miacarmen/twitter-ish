const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {};
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user by its `_id`
  // with populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then(async (user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json({ user, thoughts: await thought(req.params.userId), })
    )
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
  },
  // CREATE new user
  createUser(req, res) {
      User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // TO DO: UPDATE a user by `_id`

  // DELETE a user by `_id`
  deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : Thought.deleteMany({ _id: { $in: user.thoughts } }) 
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

};
