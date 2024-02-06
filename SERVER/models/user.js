const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    birthDate: {
        type: Date
    },
    accountType: {
        type: Schema.Types.ObjectId,
        ref: 'AccountType'
    }
});

module.exports = mongoose.model('User', userSchema);
