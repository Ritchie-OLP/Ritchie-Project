const { pool } = require("../config/database");

exports.getAllChallenges = async () => {
    const challenges = await pool.query("SELECT * FROM challenges");
    return challenges.rows;
}

exports.getChallengeById = async (id) => {
    const challenge = await pool.query("SELECT * FROM challenges WHERE id = $1", [id]);
    return challenge.rows[0];
}

exports.saveChallenge = async (challenge) => {
    const newChallenge = await pool.query(
        "INSERT INTO challenges (name, content, user_id) VALUES ($1, $2, $3) RETURNING *",
        [challenge.name, challenge.content, challenge.user_id]
    );
    return newChallenge.rows[0];
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