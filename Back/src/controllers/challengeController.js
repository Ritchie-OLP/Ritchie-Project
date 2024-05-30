const { getAllChallenges, getChallengeById, saveChallenge, updateChallenge, deleteChallenge, getChallengesByRouteId, getChallengesByLanguageId, getChallengesByModuleId, getChallengeByUserId } = require("../models/challengeModel");

exports.getAllChallenges = async (req, res) => {
    try {
        const challenges = await getAllChallenges();
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error en getAllChallenges:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await getChallengeById(id);
        if (!challenge) {
            return res.status(400).json({ message: 'No challenge found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        console.error('Error en getChallengeById:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.saveChallenge = async (req, res) => {
    try {
        const { content, name, userId, routeId, languageId, moduleId } = req.body;
        const challenge = await saveChallenge(content, name, userId, routeId, languageId, moduleId);
        res.status(200).json(challenge);
    } catch (error) {
        console.error('Error en saveChallenge:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = req.body;
        const updatedChallenge = await updateChallenge(id, challenge);
        if (!updatedChallenge) {
            return res.status(400).json({ message: 'No challenge found' });
        }
        res.status(200).json(updatedChallenge);
    } catch (error) {
        console.error('Error en updateChallenge:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChallenge = await deleteChallenge(id);
        if (!deletedChallenge) {
            return res.status(400).json({ message: 'No challenge found' });
        }
        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        console.error('Error en deleteChallenge:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getChallengesByRouteId = async (req, res) => {
    try {
        const { id } = req.params;
        const challenges = await getChallengesByRouteId(id);
        if (!challenges) {
            return res.status(400).json({ message: 'No challenges found' });
        }
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error en getChallengesByRouteId:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getChallengesByLanguageId = async (req, res) => {
    try {
        const { id } = req.params;
        const challenges = await getChallengesByLanguageId(id);
        if (!challenges) {
            return res.status(400).json({ message: 'No challenges found' });
        }
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error en getChallengesByLanguageId:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getChallengesByModuleId = async (req, res) => {
    try {
        const { id } = req.params;
        const challenges = await getChallengesByModuleId(id);
        if (!challenges) {
            return res.status(400).json({ message: 'No challenges found' });
        }
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error en getChallengesByModuleId:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getChallengesByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const challenges = await getChallengesByUserId(id);
        if (!challenges) {
            return res.status(400).json({ message: 'No challenges found' });
        }
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error en getChallengesByUserId:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}