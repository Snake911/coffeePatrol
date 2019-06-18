const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/cafe');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;