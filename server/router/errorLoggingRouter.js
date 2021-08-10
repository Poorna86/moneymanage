const express = require('express')
const ErrorsLog = require('../errorLogs/frontEndErrorLogs')

const errorLogRouter = new express.Router;

errorLogRouter.post('/sendEmail/edit', async(req, res) => {
    try{
        const edit = 'Edited'
        sendEmailReport(req.body.loginEmail, req.body.name1, req.body.name2, req.body.amount, req.body.description, edit)
        res.status(201).send()
    } catch (err) {
        try {
            const errorLoggs = new ErrorsLog(req.body, {errorMsg: err})
            await errorLoggs.save()
        } catch (error) {
            console.log(err)
            res.status(201).send({errors: err})
        }
    }
})

module.exports = errorLogRouter;