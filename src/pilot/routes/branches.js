const express = require('express');
const router = express.Router();

const branchService = require('../services/branch-service');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const { Branch,Store } = require('../sequelize')


router.get('/',async(req, res, next) => {
    
    // try
    // {
    //     //Poster.postTransaction('101001');
    //     let branches = await branchService.list();
    //     res.status(200).json(branches);
    // }
    // catch (err) 
    //   {
    //     res.status(500).json(err);
    //     console.log(err);
    //   }

    Branch.findAll().then(branches => {
        // projects will be an array of all Project instances
        res.json(branches);
      })
});


router.post('/',async(req, res, next) => {

    // const branch = {
    //     name: req.body.name
    // };

    branchService.create(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Branch record Created Successfully",
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

         

    branchService.update(id,req.body)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Branch record Updated Successfully",
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

    const branch = await branchService.get(id);

    res.status(200).json(branch);
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