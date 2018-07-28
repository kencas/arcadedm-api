const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const Poster = require('../classes/transaction');

const accountService = require('../services/account-service');
const AccType = require('../model/acctype');
const Account = require('../model/account');

var created = true;


router.get('/',async (req, res, next) => {

    try
    {
        //Poster.postTransaction('101001');
        let accounts = await accountService.list();
        res.status(200).json(accounts);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});

router.get('/listtransactions',async (req, res, next) => {

    try
    {
        //Poster.postTransaction('101001');
        let accounts = await accountService.listTransaction();
        res.status(200).json(accounts);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});

router.get('/gettransaction/:id',async (req, res, next) => {

    try
    {
        //Poster.postTransaction('101001');

        const id = req.params.id;
        let account = await accountService.getTransaction(id);
        res.status(200).json(account);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});


router.post('/',async(req, res, next) => {

    try
    {
        let acctype = await AccType.findOne({_id: req.body.acctype});
        if(acctype)
        {
            ++acctype.index;
            let account = await accountService.createAccount(acctype, req);

            res.status(200).json({
                message: "Account created successfully",
                account: account,
                flag: true
            });
        }
        else
        {
            res.status(404).json({message: 'No Acctypes found'});
        }
    }
    catch (err) 
      {
        console.error(err);
        res.status(500).send(err);
        
      }

    
});


router.post('/postTransaction',async(req, res, next) => {

    try
    {
        let transaction = await accountService.postTransaction(req);
        
            res.status(200).json(transaction);
        
    }
    catch (err) 
      {
        console.error(err);
        res.status(500).send(err);
        
      }

    
});



module.exports = router;