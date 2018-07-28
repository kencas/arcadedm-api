const express = require('express');
const router = express.Router();

const Customer = require('../model/customer');

const Account = require('../model/account');

//const multer = require('multer');

//const checkAuth = require('../middleware/check-auth');

const customerService = require('../services/customer-service');


router.get('/',async(req, res, next) => {
    
    try
    {
        let customers;

        customers = await customerService.list();
        res.status(200).json(customers);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.post('/signup',(req, res, next) => {

    
    customerService.create(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json(result);
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json(err);
    });

});


router.post('/startverify',async(req, res, next) => {

    var verify = await customerService.verify(req.body.countryCode,Number(req.body.phoneno));

    res.status(200).json(verify);

});


router.post('/doverify',async(req, res, next) => {

    var verify = await customerService.doverify(req.body.countryCode,Number(req.body.phoneno), req.body.code);

    res.status(200).json(verify);

});


router.get('/:id', async(req, res, next) => {

    const id = req.params.id;

    try
    {
        let customer = await customerService.get(id);
        let accounts = await loadAccounts(customer);
        //customer.accounts = accounts;
        res.status(200).json(customer);
    }
    catch (err) 
      {
        return res.status(500).send(err);
      }
});

var loadAccounts = async function(customer)
{
    let accounts = await Account.find({
        customer: customer._id
      })
    .populate('acctype ledger','name accountNo')
    .select('acctype accountNo balance')
    .exec();

    return accounts;
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