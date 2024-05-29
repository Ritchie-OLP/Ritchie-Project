const express = require('express');
const { getModules, getModuleById, saveModule } = require('../../controllers/moduleController');

const router = express.Router();

router.get('/language/:id', getModules);
router.get('/:id', getModuleById);
router.post('/', saveModule);


module.exports = router;