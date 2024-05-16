const express = require('express');
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');

const router = express.Router();

// Users
router.use('/users', userRoutes);
router.use('/quizzes', quizRoutes);

module.exports = router;
