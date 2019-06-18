const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function(req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId
        });
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            volume: req.body.volume,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            cafe: req.body.cafe
        }).save();
        res.status(201).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Position.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (e) {
        errorHandler(res, e);
    }
}


module.exports.update = async function(req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
}