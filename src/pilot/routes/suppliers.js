const express = require('express');
const router = express.Router();

const supplierService = require('../services/supplier-service');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');


router.get('/',async(req, res, next) => {
    
    try
    {
        //Poster.postTransaction('101001');
        let suppliers = await supplierService.list();
        res.status(200).json(suppliers);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});


router.post('/',async(req, res, next) => {

    const supplier = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        phoneno: req.body.phoneno,
        email: req.body.email,
        GLAccNo: req.body.GLAccNo,
        section: req.body.section
    };

    supplierService.create(supplier)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Supplier record Created Successfully",
            supplier: result,
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

         
    supplierService.update(id,updateOps)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Supplier record Updated Successfully",
            supplier: result,
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

    const supplier = await supplierService.get(id);

    res.status(200).json(supplier);
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