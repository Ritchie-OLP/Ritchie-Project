const express = require('express');
const { getLanguages, getLanguageById, saveLanguage } = require('../../controllers/languageController');

const router = express.Router();

router.get('/route/:id', getLanguages);
router.get('/:id', getLanguageById);
router.post('/', saveLanguage);


module.exports = router;
