const { pool } = require("../config/database");

exports.getAllRoutes = async () => {
    const routes = await pool.query("SELECT * FROM routes");
    return routes.rows;
}

exports.getRouteById = async (id) => {
    const query = `SELECT * FROM routes WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}