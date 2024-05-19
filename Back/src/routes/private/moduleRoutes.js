const express = require('express');
const { getModules, getModuleById } = require('../../controllers/moduleController');

const router = express.Router();

router.get('/language/:id', getModules);
router.get('/:id', getModuleById);


module.exports = router;