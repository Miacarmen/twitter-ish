const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Route to get all users or create a user
router
    .route("/")
    .get(getUsers)
    .post(createUser);

// route to get user by id, update, or delete
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// route to add or delete a friend
router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
