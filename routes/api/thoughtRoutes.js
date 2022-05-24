const router = require('express').Router();

const {
    getThoughts,
    getThoughtsById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route to get all thoughts
router
    .route('/')
    .get(getThoughts);

// Route to get, create, and update thoughts by id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThought);

// Route to post a add a thought
router
    .route('/:userId')
    .post(createThought);

router 
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

// Route to add a reaction
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

// Route to delete reaction by Id
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;