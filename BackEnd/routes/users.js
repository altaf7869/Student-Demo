const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

// User Signup
 router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Email Already Exist!"
                    });
                });
        });
});

// User Login
 router.post("/login", (req, res, next) => {
    let fetcheduser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication Failed: User not found"
                })
            }
            fetcheduser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication Failed: Password did not match"
                })
            }
            const token = jwt.sign(
                { name:fetcheduser.name, email: fetcheduser.email, userId: fetcheduser._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication Failed"
            })
        });
});

// router.get('/', async  (req, res) => {
//     try {
//       const user = new User(req.body);
//       await user.save();
//       res.send(user);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

//   router.get('/', async(req, res) => {
//     User.find(req.user, function(err, user) {
//       res.send(user);
//     });
//   });
  router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  module.exports = router;
