const express = require('express');
const router = express.Router();

const productService = require('../services/product-service');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const { Product } = require('../sequelize')

const Misc= require('../classes/misc')


router.get('/',async(req, res, next) => {
    
    try
    {
        //Poster.postTransaction('101001');
        let products = await productService.list();
        res.status(200).json(products);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }

    // Branch.findAll().then(branches => {
    //     // projects will be an array of all Project instances
    //     res.json(branches);
    //   })
});


router.post('/',async(req, res, next) => {

    // const branch = {
    //     name: req.body.name
    // };

    productService.create(req.body)
    .then(result => {
        
        console.log(result);
        res.status(200).json({
            message: "Product record Created Successfully",
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

    // try
    // {
    //     //Poster.postTransaction('101001');
    //     let product = await productService.create(req.body);
    //     console.log(result),
    //     res.status(200).json({
    //         message: "Product record Created Successfully",
    //         product: product,
    //         flag: true
    //     });
    // }
    // catch (err) 
    //   {
    //     res.status(500).json({
    //         error: err,
    //         message: "An error occurred",
    //         flag: false
    //     });
    //   }


    // Branch.create(req.body)
    //     .then(user => res.json(user))
});



router.patch('/:id',(req, res, next) => {

    const id = req.params.id;

    const updateOps = {};

    // for(const ops of req.body)
    // {
    //     updateOps[ops.propName] = ops.value;
    // }

         

    productService.update(id,req.body)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Product record Updated Successfully",
            product: result,
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

    const product = await productService.get(id);

    res.status(200).json(product);
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