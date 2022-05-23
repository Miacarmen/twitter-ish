const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route to get all thoughts
router
    .route('/')
    .get(getAllThoughts);

// Route to get, create, and update thoughts by id
router.route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// Route to post a add a thought
router.route('/:userId')
    .post(createThoughts);

// Route to add a reaction
router.route('/:thoughtId/reactions')
    .post(createReaction);

// Route to delete reaction by Id
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;