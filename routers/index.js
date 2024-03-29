/**
 * Created by zZ on 2017/5/27.
 */
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/login');
});

router.get('/home', function (req, res) {
    if (!req.cookies.user) {
        res.redirect('/login');
    } else {
        if (!req.cookies.flag) {
            User.findOne({
                username: req.cookies.user
            }).then(function (userInfo) {
                res.render('home', {
                    username: userInfo.username,
                    image: userInfo.image
                });
            });
        } else {
            res.redirect('/exit');
        }

    }
});

module.exports = router;