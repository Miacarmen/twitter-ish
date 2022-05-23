const router = require('express').Router();

// import routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// endpoints
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;