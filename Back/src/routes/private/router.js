const express = require('express');
const userRoutes = require('./userRoutes');
const routeRoutes = require('./routeRoutes');
const languageRoutes = require('./languageRoutes');
const moduleRoutes = require('./moduleRoutes')
const challengeRoutes = require('./challengeRoutes')

const router = express.Router();

// Users
router.use('/users', userRoutes);

// Routes
router.use('/routes', routeRoutes);

// Languages
router.use('/languages', languageRoutes)

// Modules
router.use('/modules', moduleRoutes);

//Challenges
router.use('/challenges', challengeRoutes);

module.exports = router;
