var express = require('express');
const bodyparser = require('body-parser');
var User = require('../models/user')
var router = express.Router();
var passport = require('passport');
router.use(bodyparser.json());



router.post('/signup',(req,res,next) =>{
    User.register(new User({username: req.body.username}),req.body.password,
    (err,user) =>{
        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({err: err});
        }
        else {
            passport.authenticate('local')(req,res, ()=> {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({status: 'Registration Successfull',success: true});
            })
        }
    })
});

router.post('/login',passport.authenticate('local'), (req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({status: 'you are logged in Successfull',success: true});
});

router.get('/logout',(req,res) => {
    if(req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else{
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;