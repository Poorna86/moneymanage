const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name1:{
        type: String,
        required: true,
        trim: true
    },
    name2:{
        type: String,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    contact:{
        type: Number,
        contact: true,
        required: true,
        maxlength: 10,
        trim: true
    },
    createdAt:{
        type: Date,
        required: true,
    },
    paidStatus:{
        type: String,
        required: false
    }
})

const User = mongoose.model('Expenses', userSchema)

module.exports = User