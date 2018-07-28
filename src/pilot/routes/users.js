const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const config = require('../../config');


router.post('/signup',(req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1)
        {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        else
        {
            password: bcrypt.hash(req.body.password, 10,(err, hash) => {
                if(err)
                {
                    return res.status(500).json({
                        error: err,
                        message: "An error occured"
                    });
                }
                else
                {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result),
                        res.status(200).json({
                            message: "User Created Successfully",
                            user: result,
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
                }
                
            });
        }
    });
    
       


    
});

router.post('/login',(req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1)
        {
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        bcrypt.compare(req.body.password,user[0].password, (err, result) =>{

            if(err)
            {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            if(result)
            {
               const token =  jwt.sign({
                    email: user[0].email,
                    userID: user[0]._id
                },
                config.secretKey,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: "Auth Succeeded",
                    token: token
                });
            }

            return res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch();
});

router.delete('/:id',(req, res, next) => {

    const id = req.params.id;

    User.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "User deleted successfuly",
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