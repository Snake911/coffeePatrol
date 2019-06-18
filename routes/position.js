const express = require('express');
const router = express.Router();
const controller = require('../controllers/position');
const upload = require('../middleware/upload');

router.get('/:categoryId', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;