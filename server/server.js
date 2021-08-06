const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { sendEmailReport } = require('./sendEmail/sendEmail')

// middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const publicPath = path.join(__dirname, '..' , 'public')
const port = process.env.PORT

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.post('/sendEmail/add', (req, res) => {
    const add = 'added'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, add)
    res.status(201)
})

app.post('/sendEmail/edit', (req, res) => {
    const edit = 'Edited'
    console.log('req.body.loginEmail: ', req.body.loginEmail)
    sendEmailReport(req.body.loginEmail, req.body.name1, req.body.name2, req.body.amount, req.body.description, edit)
    res.status(201).send({data: 'sucess'})
})

app.post('/sendEmail/delete', (req, res) => {
    const deleted = 'deleted'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, deleted)
    res.status(201)
})

app.listen(port, () => {
    console.log('server up running')
});