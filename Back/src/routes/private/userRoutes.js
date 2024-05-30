const express = require('express');
const { getAll, getById, update, delete: deleteUser, updatePoints } = require('../../controllers/userController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteUser);
router.put('/points/:id', updatePoints);


module.exports = router;
