const express = require('express');
const router = express.Router();
const pricingService = require('../services/pricing-service');


router.get('/',(req, res, next) => {
    
    AccType.find()
    .populate('account ledger','name balance')
    .exec()
    .then(docs => {

        if(docs.length > 0)
        {
            console.log(docs)
            res.status(200).json(docs);
        }
        else
        {
            res.status(404).json({message: 'No Acctypes found'});
        }
        
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
});


router.post('/',(req, res, next) => {

    pricingService
    .create(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Account Type Created Successfully",
            package: result,
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


router.get('/byname',(req, res, next) => {
    Movie.find()
    .select('name')
    .exec()
    .then(docs => {

        // if(docs.length > 0)
        // {
        //     console.log(docs)
        //     res.status(200).json(docs);
        // }
        // else
        // {
        //     res.status(404).json({message: 'No entries found'});
        // }

        //const producers = {};

        const name = '';

           const packages = docs.map(doc => {
            return {
                name: doc.name,
                _id: doc._id,
            }     
            
        
            });
        

        

        res.status(200).json(packages);
        
        
        
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    }
        );
});

router.get('/:id',(req, res, next) => {

    const id = req.params.id;

    AccType.findById(id)
    .populate('ledger','name section')
    .exec()
    .then(doc => {

        if(doc)
        {
            res.status(200).json(doc);
        }
        else
        {
            res.status(404).json({
                message: 'No Account Package found'});
        }
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
});

router.patch('/:id',(req, res, next) => {

    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    AccType.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Account Package updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Account Package updated successfuly",
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