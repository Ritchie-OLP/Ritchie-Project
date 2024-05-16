const express = require('express');
const { getAllQuizzes } = require('../../controllers/quizController');

const router = express.Router();

router.get('/getquizzes', getAllQuizzes);

module.exports = router;