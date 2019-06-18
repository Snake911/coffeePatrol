const Comment = require('../models/Comment');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCafeId = async function(req, res) {
    try {
        const comments = await Comment.find({cafe: req.params.cafeId});
        res.status(200).json(comments);
    } catch (e) {
        errorHandler(res, e);        
    }
}

module.exports.getByLogin = async function(req, res) {
    try {
        const comments = await Comment.find({user: req.user.id});
        res.status(200).json(comments);
    } catch (e) {
        errorHandler(res, e);        
    }
}

module.exports.create = async function(req, res) {
    try {
        const comment = await new Comment({
            user: req.user.id,
            cafe: req.body.cafe,
            comment: req.body.comment,
            rating: req.body.rating
        }).save();
        res.status(201).json(comment);
    } catch (e) {
        errorHandler(res, e);        
    }
}

module.exports.update = async function(req, res) {
    try {
        const comment = await Comment.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(comment);
    } catch (e) {
        errorHandler(res, e);        
    }
}


module.exports.remove = async function(req, res) {
    try {
        await Comment.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Комментарий был удален'
        })
    } catch (e) {
        errorHandler(res, e);        
    }
}