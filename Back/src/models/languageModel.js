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