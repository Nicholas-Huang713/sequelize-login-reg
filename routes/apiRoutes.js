const express = require('express');
const router = express.Router();
const db = require('../models');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//GET ALL USERS
router.get('/all', (req, res) => {
    db.User.findAll().then(Users => res.send(Users));
});

//GET USER BY ID
router.get('/find/:id', (req, res) => {
    db.User.findAll({
        where: {
            id: req.params.id
        }
    }).then(User => res.send(User));
})

//REGISTER NEW USER
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const emailExist = await db.User.findOne({where: {email: req.body.email}});
    if(emailExist) return res.status(400).json('Email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    db.User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })
        .then(submittedUser => {
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            res.send(submittedUser);
        })
        .catch((err) => res.send(err))
});

//DELETE USER
router.delete('/delete/:id', (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("success"));
})

//EDIT USER
router.put('/edit', (req, res) => {
    db.User.update({
        text: req.body.text
    }, {
        where: {
            id: req.body.id
        }
    }).then(res.send("success"));
})
module.exports = router;
