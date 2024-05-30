const { pool } = require("../config/database");

exports.getAllChallenges = async () => {
    const challenges = await pool.query("SELECT * FROM challenges");
    return challenges.rows;
}

exports.getChallengeById = async (id) => {
    const challenge = await pool.query("SELECT * FROM challenges WHERE id = $1", [id]);
    return challenge.rows[0];
}

exports.saveChallenge = async (content, name, userId, routeId, languageId, moduleId) => {
    const query = `INSERT INTO challenges (content, name, user_id, route_id, language_id, module_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [content, name, userId, routeId, languageId, moduleId];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

exports.updateChallenge = async (id, challenge) => {
    const updatedChallenge = await pool.query(
        "UPDATE challenges SET name = $1, content = $2, user_id = $3 WHERE id = $4 RETURNING *",
        [challenge.name, challenge.content, challenge.user_id, id]
    );
    return updatedChallenge.rows[0];
}

exports.deleteChallenge = async (id) => {
    await pool.query("DELETE FROM challenges WHERE id = $1", [id]);
}

exports.getChallengesByRouteId = async (routeId) => {
    const challenges = await pool.query("SELECT * FROM challenges WHERE route_id = $1", [routeId]);
    return challenges.rows;
}

exports.getChallengesByLanguageId = async (languageId) => {
    const challenges = await pool.query("SELECT * FROM challenges WHERE language_id = $1", [languageId]);
    return challenges.rows;
}

exports.getChallengesByModuleId = async (moduleId) => {
    const challenges = await pool.query("SELECT * FROM challenges WHERE module_id = $1", [moduleId]);
    return challenges.rows;
}

exports.getChallengeByUserId = async (userId) => {
    const challenges = await pool.query("SELECT * FROM challenges WHERE user_id = $1", [userId]);
    return challenges.rows;
}