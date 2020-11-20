const express = require('express');
//const logger = require('morgan');
const path = require('path');
require('./db/mongoose');
const userRouter = require('./routers/users');

const app = express();

//app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter)
const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    console.log('get request')
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('server up running', port)
});