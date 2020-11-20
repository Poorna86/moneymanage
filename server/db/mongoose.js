const mongoose = require('mongoose')

console.log('process.env.MONGODB_URL 1: ', process.env.MONGODB_URL)
mongoose.connect('mongodb://127.0.0.1:27017/moneymanage', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/moneymanage',{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })