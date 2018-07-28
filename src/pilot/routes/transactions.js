const express = require('express');
const router = express.Router();

const Transaction = require('../model/transaction');

const Account = require('../model/account');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');


router.get('/',(req, res, next) => {
    
    Customer.find()
    .populate('account')
    .exec()
    .then(docs => {

        if(docs.length > 0)
        {
            console.log(docs)
            res.status(200).json(docs);
        }
        else
        {
            res.status(404).json({message: 'No Customer found'});
        }
        
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
});


router.post('/',checkAuth,(req, res, next) => {

    const customer = new Customer({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneno: req.body.phoneno,
        address1: req.body.address
    });

    customer
    .save()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Customer record Created Successfully",
            customer: result,
            flag: true
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error: err,
            message: "An error occurred",
            flag: false
        })
    });
});


router.get('/:id',(req, res, next) => {

    const id = req.params.id;

    Customer.findById(id)
    .populate('account')
    .exec()
    .then(doc => {

        if(doc)
        {
            
            //res.status(200).json(doc);
            loadAccounts(doc,req,res);
        }
        else
        {
            res.status(404).json({
                message: 'No Customer record found'});
        }
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
});

var loadAccounts = function(customer, req,res)
{
    Account.find({
        customer: customer._id
      })
    .populate('acctype','name')
    .select('acctype accountNo balance')
    .exec()
    .then(accounts => {

        customer.accounts = accounts;
            res.status(200).json(customer);
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
}

router.patch('/:id',(req, res, next) => {

    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Customer.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Customer record updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Customer record updated successfuly",
            flag: true,
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error: err,
            message: "There is an error",
            flag: false
        })
    });
});

router.delete('/:id',(req, res, next) => {

    const id = req.params.id;

    Customer.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Customer record deleted successfuly",
            flag: true,
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error: err,
            message: "Error occurred",
            flag: false,
        })
    });
});

module.exports = router;