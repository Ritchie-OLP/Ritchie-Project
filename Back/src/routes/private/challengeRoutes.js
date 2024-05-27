const express = require('express');
const { getAllChallenges, getChallengeById, saveChallenge, updateChallenge, deleteChallenge, getChallengesByRouteId, getChallengesByLanguageId, getChallengesByModuleId, getChallengesByUserId } = require('../../controllers/challengeController');

const router = express.Router();

router.get('/getallchallenges', getAllChallenges);
router.get('/:id', getChallengeById);
router.post('/', saveChallenge);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);
router.get('/route/:id', getChallengesByRouteId);
router.get('/language/:id', getChallengesByLanguageId);
router.get('/module/:id', getChallengesByModuleId);
router.get('/user/:id', getChallengesByUserId);


module.exports = router;
