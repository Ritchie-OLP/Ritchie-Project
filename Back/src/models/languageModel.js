const { pool } = require("../config/database");

exports.filterLanguagesByRoute = async (routeId) => {
    const query = `SELECT * FROM languages WHERE route_id = $1`;
    const { rows } = await pool.query(query, [routeId]);
    return rows;
}

exports.getLanguageById = async (id) => {
    const query = `SELECT * FROM languages WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

exports.saveLanguage = async (name, routeId, image) => {
    const query = `INSERT INTO languages (name, route_id, image) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, routeId, image];
    const { rows } = await pool.query(query, values);
    return rows[0];
}