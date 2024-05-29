const { getAllRoutes, getRouteById, saveRoute } = require("../models/routeModel");

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await getAllRoutes();
        res.status(200).json(routes);
    } catch (err) {
        console.error('Error en getAllRoutes:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await getRouteById(id);
        if (!route) {
            return res.status(400).json({ message: 'No route found' });
        }
        res.status(200).json(route);
    } catch (err) {
        console.error('Error en getRouteById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.saveRoute = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const route = await saveRoute(name, description, image);
        res.status(200).json(route);
    } catch (err) {
        console.error('Error en saveRoute:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}