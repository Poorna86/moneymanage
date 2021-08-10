const express = require('express')
const { sendEmailReport } = require('../sendEmail/sendEmail')
const ErrorsLog = require('../errorLogs/frontEndErrorLogs')

const errorLogRouter = new express.Router;

errorLogRouter.post('/sendEmail/add', (req, res) => {
    try{
        const add = 'added'
        sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, add)
        res.status(201).send()
    } catch (err){
        try {
            console.log(err)
            const errorLoggs = new ErrorsLog(req.body, {errorMsg: err})
            errorLoggs.save()
        } catch (error){
            console.log(err)
            res.status(401).send({errors: err})
        }
    } 
})

errorLogRouter.post('/sendEmail/edit', (req, res) => {
    try{
        const edit = 'Edited'
        sendEmailReport(req.body.loginEmail, req.body.name1, req.body.name2, req.body.amount, req.body.description, edit)
        res.status(201).send()
    } catch (err) {
        try {
            console.log(err)
            const errorLoggs = new ErrorsLog(req.body, {errorMsg: err})
            errorLoggs.save()
        } catch (error) {
            console.log(err)
            res.status(401).send({errors: err})
        }
    }
})

errorLogRouter.post('/sendEmail/delete', (req, res) => {
    try{
        const deleted = 'deleted'
        sendEmailReport(req.body.loginEmail,req.body.name1,req.body.name2,req.body.amount, req.body.description, deleted)
        res.status(201).send()
    }catch (err){
        try {
            console.log(err)
            const errorLoggs = new ErrorsLog(req.body, {errorMsg: err})
            errorLoggs.save()
        } catch (error){
            console.log(err)
            res.status(401).send({errors: err})
        }
    }
})

module.exports = errorLogRouter;