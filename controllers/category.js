const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCafeId = async function(req, res) {
    try {
        const categories = await Category.find({
            cafe: req.params.cafeId
        });
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const category = await new Category({
            name: req.body.name,
            cafe: req.body.cafe
        }).save();
        res.status(201).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function(req, res) {
    try {
        const category = await Category.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
}


module.exports.remove = async function(req, res) {
    try {
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});
        res.status(200).json({
            message: 'Категория была удалена'
        })
    } catch (e) {
        errorHandler(res, e);
    }
}