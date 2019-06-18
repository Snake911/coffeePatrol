const Cafe = require('../models/Cafe');
const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    try {
        const cafes = await Cafe.find();
        res.status(200).json(cafes)
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function(req, res) {
    try {
        const cafe = await Cafe.find({
            category: req.params.id
        });
        res.status(200).json(cafe);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Cafe.remove({_id: req.params.id});
        await Category.remove({cafe: req.params.id});
        await Position.remove({cafe: req.params.id});
        res.status(200).json({
            message: 'Кафе было удалено'
        })
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const cafe = await new Cafe({
            name: req.body.name,
            address: req.body.address,
            logoSrc: req.file.path,
            rating: 0,
            admin: req.body.admin
        }).save();
        res.status(201).json(cafe);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating,
        admin: req.body.admin,
        coordLat: req.body.coordLat,
        coordLong: req.body.coordLong
    }
    if(req.file) {
        updated.logoSrc = req.file.path
    }
    try {
        const cafe = await Cafe.findOneAndUpdate(
            {_id:req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(cafe);
    } catch (e) {
        errorHandler(res, e);
    }
}