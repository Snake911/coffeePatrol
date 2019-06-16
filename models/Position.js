const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    volume:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        ref:'categories',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema);