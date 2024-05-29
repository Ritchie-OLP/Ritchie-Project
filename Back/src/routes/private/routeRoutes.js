const express = require('express');
const { getAllRoutes, getRouteById, saveRoute } = require('../../controllers/routeController');

const router = express.Router();

router.get('/getallroutes', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', saveRoute);


module.exports = router;
