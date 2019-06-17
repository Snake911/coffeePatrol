const express = require('express');
const router = express.Router();
const passport = require('passport')
const controller = require('../controllers/category');

router.get('/:cafeId', passport.authenticate('jwt', {session: false}),controller.getByCafeId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;