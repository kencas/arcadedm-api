const express = require('express');
const router = express.Router();

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const Ticket = require('../model/ticket');

router.get('/',(req, res, next) => {
    Ticket.find()
    .populate('package')
    .exec()
    .then(producers => {

        

        

        res.status(200).json(producers);
        
        
        
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    }
        );
});


router.post('/',(req, res, next) => {

    const producer = new Producer({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phoneno: req.body.phoneno,
        city: req.body.city,
        state: req.body.state
    });

    console.log(req.file);

    producer
    .save()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Producer Created Successfully",
            producer: result,
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

    Producer.findById(id)
    .exec()
    .then(doc => {

         if(doc)
         {
        //     const producer = {
        //         _id: doc._id,
        //         name: doc.name,
        //         address: doc.address,
        //         city: doc.city,
        //         state: doc.state,
        //         phoneno: doc.phoneno,
        //         email: doc.email
                
        //     };

            res.status(200).json(doc);
        }
        else
        {
            res.status(404).json({
                message: 'No Producer for ID'});
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

    Producer.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Product updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Product updated successfuly",
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

    Producer.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Product deleted successfuly",
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