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

exports.saveRoute = async (name, description, image) => {
    const query = `INSERT INTO routes (name, description, image) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, description, image];
    const  { rows }  = await pool.query(query, values);
    return rows[0];
}