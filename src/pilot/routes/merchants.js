const express = require('express');
const router = express.Router();

const Merchant = require('../model/merchant');

const merchantService = require('../services/merchant-service');


router.get('/',async(req, res, next) => {
    
    try
    {
        let merchants;

        merchants = await merchantService.list();
        res.status(200).json(merchants);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});

router.get('/list',async(req, res, next) => {
    
    try
    {
        let merchants;

        merchants = await merchantService.list();
        res.status(200).json(merchants);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.post('/',(req, res, next) => {

    
    merchantService.create(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json(result);
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json(err);
    });

});



router.get('/:id', async(req, res, next) => {

    const id = req.params.id;

    try
    {
        let customer = await merchantService.get(id);
       
        res.status(200).json(customer);
    }
    catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.patch('/:id',(req, res, next) => {

    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Merchant.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Merchant record updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Merchant record updated successfuly",
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

    Merchant.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Merchant record deleted successfuly",
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