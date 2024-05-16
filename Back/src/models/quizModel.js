const { pool } = require("../config/database");

exports.getAllQuizzes = async () => {
    const query = `SELECT * FROM quizzes`;
    const { rows } = await pool.query(query);
    return rows;
}