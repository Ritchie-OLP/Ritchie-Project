const { pool } = require("../config/database");

exports.getAllQuizzes = async () => {
    const query = `SELECT * FROM quizzes`;
    const { rows } = await pool.query(query);
    return rows;
}

exports.saveQuiz = async (right_one,question,answer)=>{
    const query = `INSERT INTO quizzes(right_one,question,answer)
                  VALUES ($1,$2,$3)
                  RETURNING right_one,question,answer`
    const values = [right_one,question,answer]
    const { rows } = await pool.query(query,values)
    return rows
}