const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment');

router.get('/:cafeId', controller.getByCafeId);
router.get('/', controller.getByLogin);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;