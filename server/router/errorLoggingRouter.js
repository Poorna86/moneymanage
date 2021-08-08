const express = require('express')
const ErrorLogs = require('../errorLogs/errorLogs')

const errorLogRouter = new express.Router;

errorLogRouter.post('/sendEmail/edit', async(req, res) => {
    ErrorLogs.init()
    try{
        const edit = 'Edited'
        const errorLoggs = new ErrorLogs(req.body, {errorMsg: 'errors'})
        await errorLoggs.save()
        sendEmailReport(req.body.loginEmail, req.body.name1, req.body.name2, req.body.amount, req.body.description, edit)
        res.status(201).send()
    } catch (err) {
        try {
            const errorLoggs = new ErrorLogs(req.body, {errorMsg: err})
            await errorLoggs.save()
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = errorLogRouter;