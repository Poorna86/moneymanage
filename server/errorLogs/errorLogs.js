const mongoose = require('mongoose')

const errorsLogs = new mongoose.Schema({
    _id: {
        id: mongoose.Schema.Types.ObjectId,
    },
    name1: {
        type: String,
    },
    name2: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    phone: {
        type: Number
    },
    interest: {
        type: Number
    },
    createdAt: {
        type: Date,
        trim: true
    },
    paidStatus: {
        type: String
    },
    paidDate: {
        type: Date,
        trim: true
    },
    partialExpense: [{
        balance:{ 
            type: String
        },
        interestAmount: {
            type: Number
        },
        partialAmount:{
            type: Number
        },
        partialPaidStatus:{
            type: String
        },
        pendingInterest:{
            type: Number
        },
        updateDate:{
            type: String
        }
    }],
    loginEmail: {
        type: String
    },
    errorMsg: {
        type: String
    }
},{
    timestamps: true
})

const ErrorLogs = mongoose.model('Error_Logs', errorsLogs)

module.exports = ErrorLogs