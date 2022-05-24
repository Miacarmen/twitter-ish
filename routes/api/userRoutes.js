const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// Users Routes
router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// TO-DO: routes to add or remove friends

module.exports = router;