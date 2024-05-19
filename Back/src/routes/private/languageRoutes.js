const express = require('express');
const { getLanguages, getLanguageById } = require('../../controllers/languageController');

const router = express.Router();

router.get('/route/:id', getLanguages);
router.get('/:id', getLanguageById);


module.exports = router;
