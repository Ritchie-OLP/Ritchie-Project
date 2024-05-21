const express = require('express');
const { getAllChallenges, getChallengeById, saveChallenge, updateChallenge, deleteChallenge } = require('../../controllers/challengeController');

const router = express.Router();

router.get('/getallchallenges', getAllChallenges);
router.get('/:id', getChallengeById);
router.post('/', saveChallenge);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);


module.exports = router;
