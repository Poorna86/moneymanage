const express = require('express')
const path = require('path')
require('./db/mongoose')
const errorLogsRouter = require('./router/errorLoggingRouter')

const app = express()
const publicPath = path.join(__dirname, '..' , 'public')
const port = process.env.PORT

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(publicPath))
app.use(errorLogsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('server up running')
});