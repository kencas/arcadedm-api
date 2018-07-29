const express = require('express');
const router = express.Router();

const Category = require('../model/category');

const categoryService = require('../services/category-service');


router.get('/',async(req, res, next) => {
    
    try
    {
        let categories;

        categories = await categoryService.list();
        res.status(200).json(categories);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});

router.get('/list',async(req, res, next) => {
    
    try
    {
        let categories;

        categories = await categoryService.list();
        res.status(200).json(categories);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.post('/',(req, res, next) => {

    
    categoryService.create(req.body)
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
        let category = await categoryService.get(id);
       
        res.status(200).json(category);
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

    Category.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Category record updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Category record updated successfuly",
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

    Category.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Category record deleted successfuly",
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