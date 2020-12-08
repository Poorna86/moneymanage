const express = require('express');
const cors = require('cors');
const moment = require('moment');
const router = new express.Router;
const User = require('../models/user');

//use cors to allow cross origin resource sharing
// router.use(
//     cors({
//       origin: 'http://localhost:3000',
//       credentials: true,
//     })
//   );

router.post('/create', async (req, res) => {
    const expenses = {
          name1: req.body.name1,
          name2: req.body.name2,
          amount: req.body.amount,
          description: req.body.description,
          contact: req.body.phone,
          createdAt: moment(req.body.createdAt).format('YYYY-MM-DD'),
          paidStatus: req.body.paidStatus
        }
    const user = new User(expenses)

    try{
      console.log('check')
        await user.save()
        res.send(expenses);
    } catch(e) {
      const errorMsg = JSON.stringify(e)
        res.status(400).send(errorMsg)
    }    

  //  expensesData.push(newExpenses);
    
});

router.get('/dashboard', async (req, res) => {
  
  console.log('get details: ', req.body)

});

module.exports = router;