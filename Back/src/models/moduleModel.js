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

exports.saveModule = async (name, languageId, content, image) => {
    const query = `INSERT INTO modules (name, language_id, content, image) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, languageId, content, image];
    const { rows } = await pool.query(query, values);
    return rows[0];
}