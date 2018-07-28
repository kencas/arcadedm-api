const express = require('express');
const router = express.Router();

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const fileFilter = (req, file, cb) =>
{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png')
    {
        cb(null,true);
    }
    else
    {
        cb(null,false);
    }
    
    
}


const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb)
    {
        cb(null,new Date().toISOString() + file.originalname);
    }

});

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

const Producer = require('../model/producer');

router.get('/',(req, res, next) => {
    Producer.find()
    .populate('movies')
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

           const producers = docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    address: doc.address,
                    city: doc.city,
                    state: doc.state,
                    phoneno: doc.phoneno,
                    email: doc.email
                };
            });
        

        

        res.status(200).json(producers);
        
        
        
        
        
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    }
        );
});


router.get('/byname',(req, res, next) => {
    Producer.find()
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

           const producers = docs.map(doc => {
            return {
                name: doc.name,
                _id: doc._id,
            }     
            
        
            });
        

        

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