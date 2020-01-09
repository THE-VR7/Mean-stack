var express = require('express');
const bodyparser = require('body-parser');
var User = require('../models/user')
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
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
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({token:token,status: 'you are logged in Successfull',success: true});
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