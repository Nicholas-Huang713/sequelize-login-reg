const express = require('express');
const router = express.Router();
const db = require('../models');

//GET ALL TODOS
router.get('/all', (req, res) => {
    db.Todo.findAll().then(todos => res.send(todos));
});

//GET TODO BY ID
router.get('/find/:id', (req, res) => {
    db.Todo.findAll({
        where: {
            id: req.params.id
        }
    }).then(todo => res.send(todo));
})

//CREATE NEW TODO
router.post('/new', (req, res) => {
    db.Todo.create({
        text: req.body.text
    }).then(submittedTodo => res.send(submittedTodo));
});

//DELETE TODO
router.delete('/delete/:id', (req, res) => {
    db.Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("success"));
})

//EDIT TODO
router.put('/edit', (req, res) => {
    db.Todo.update({
        text: req.body.text
    }, {
        where: {
            id: req.body.id
        }
    }).then(res.send("success"));
})
module.exports = router;
