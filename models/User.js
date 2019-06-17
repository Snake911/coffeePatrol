const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    photoSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('users', userSchema);