const express = require('express')
const path = require('path')
require('./db/mongoose')
const { sendEmailReport } = require('./sendEmail/sendEmail')
const errorLogRouter = require('./router/errorLoggingRouter')

const app = express()
const publicPath = path.join(__dirname, '..' , 'public')
const port = process.env.PORT

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(publicPath))
app.use(errorLogRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.post('/sendEmail/add', (req, res) => {
    const add = 'added'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, add)
    res.status(201)
})

app.post('/sendEmail/delete', (req, res) => {
    const deleted = 'deleted'
    sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, deleted)
    res.status(201)
})

app.listen(port, () => {
    console.log('server up running')
});