const express = require('express');
const router = express.Router();

const ledgerService = require('../services/ledger-service');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');


router.get('/',async(req, res, next) => {
    
    try
    {
        //Poster.postTransaction('101001');
        let ledgers = await ledgerService.list();
        res.status(200).json(ledgers);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});


router.post('/',async(req, res, next) => {

    const ledger = {
        name: req.body.name,
        AccNo: req.body.AccNo,
        acctype: req.body.acctype,
        prefix: req.body.prefix
    };

    ledgerService.create(ledger)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Ledger record Created Successfully",
            branch: result,
            flag: true
        });
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json({
            error: err,
            message: "An error occurred",
            flag: false
        });
    });
});



router.patch('/:id',(req, res, next) => {

    const id = req.params.id;

    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

         
    ledgerService.update(id,updateOps)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Ledger record Updated Successfully",
            branch: result,
            flag: true
        });
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json({
            error: err,
            message: "An error occurred",
            flag: false
        });
    });
    
});

router.get('/:id',async(req, res, next) => {

    const id = req.params.id;

    const ledger = await ledgerService.get(id);

    res.status(200).json(ledger);
});



router.delete('/:id',(req, res, next) => {

    const id = req.params.id;

    Package.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Account Package deleted successfuly",
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