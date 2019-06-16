const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    logoSrc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    admin:{
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    coordLat:{
        type: Number,
        default: ''
    },
    coordLong:{
        type: Number,
        default: ''
    }
})

module.exports = mongoose.model('cafes', cafeSchema);