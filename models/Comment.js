const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    cafe:{
        ref: 'cafes',
        type: Schema.Types.ObjectId
    },
    comment:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comments', commentSchema);