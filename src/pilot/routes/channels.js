const express = require('express');
const router = express.Router();

const channelService = require('../services/channel-service');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');


router.get('/',async(req, res, next) => {
    
    try
    {
        //Poster.postTransaction('101001');
        let channels = await channelService.list();
        res.status(200).json(channels);
    }
    catch (err) 
      {
        res.status(500).json(err);
        console.log(err);
      }
});


router.post('/',async(req, res, next) => {

    const channel = {
        name: req.body.name,
        GLAccNo: req.body.GLAccNo
    };

    channelService.create(channel)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Payment Channel record Created Successfully",
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

         

    channelService.update(id,updateOps)
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Payment Channel record Updated Successfully",
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

    const channel = await channelService.get(id);

    res.status(200).json(channel);
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