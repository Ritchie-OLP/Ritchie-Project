const { pool } = require("../config/database");

exports.filterModulesByLanguage = async (languageId) => {
    const query = `SELECT * FROM modules WHERE language_id = $1`
    const { rows } = await pool.query(query,[languageId]);
    return rows;
}

exports.getModuleById = async (id) => {
    const query = `SELECT * FROM modules WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}