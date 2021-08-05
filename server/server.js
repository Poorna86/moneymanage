const express = require('express')
const path = require('path')
const { sendEmailReport } = require('./sendEmail/sendEmail')
const app = express();
const publicPath = path.join(__dirname, '..' , 'public')
const port = process.env.PORT



app.use(express.static(publicPath));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.post('/sendEmail/add', (req, res) => {
    console.log('expense: ', req.body.loginEmail)
    const add = 'added'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, add)
    res.status(201)
})

app.post('/sendEmail/edit', (req, res) => {
    try{
        const edit = 'Edited'
        sendEmailReport(req.body.loginEmail, req.body.name1, req.body.name2, req.body.amount, req.body.description, edit)
        res.status(201).send('success')
    } catch (err) {
        console.log(err)
        res.status(401).send('error')
    }

})

app.post('/sendEmail/delete', (req, res) => {
    const deleted = 'deleted'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, deleted)
    res.status(201)
})

app.listen(port, () => {
    console.log('server up running')
});