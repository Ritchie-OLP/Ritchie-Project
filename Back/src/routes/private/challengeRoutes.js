const express = require('express');
const { getAllChallenges, getChallengeById, saveChallenge, updateChallenge, deleteChallenge, getChallengesByRouteId } = require('../../controllers/challengeController');

const router = express.Router();

router.get('/getallchallenges', getAllChallenges);
router.get('/:id', getChallengeById);
router.post('/', saveChallenge);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);
router.get('/getchallengesbyroute/:id', getChallengesByRouteId);


module.exports = router;
