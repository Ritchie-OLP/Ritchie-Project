const express = require('express');
const { getAllRoutes, getRouteById } = require('../../controllers/routeController');

const router = express.Router();

router.get('/getallroutes', getAllRoutes);
router.get('/:id', getRouteById);


module.exports = router;
