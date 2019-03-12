let router = require('express').Router()
let Tasks = require('../models/task')

let basePath = '/:boardId/lists/:listId/tasks'

//GET
router.get(basePath, (req, res, next) => {
    let listId = req.params.listId
    Tasks.find({ authorId: req.session.uid, listId })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//POST
router.post(basePath, (req, res, next) => {
    let authorId = req.session.uid
    let boardId = req.params.boardId
    let listId = req.params.listId
    let description = req.params.description
    Tasks.create(req.body)
        .then(newTask => {
            res.send(newTask)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//PUT
router.put(basePath + '/:id', (req, res, next) => {
    Tasks.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
        .then(task => {
            res.status(200).send(task)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//DELETE
router.delete(basePath + '/:id', (req, res, next) => {
    Tasks.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
        .then(task => {
            res.send("Successfully Deleted")
        })
        .catch(err => {
            res.status(400).send('ACCESS DENIED; Invalid Request')
        })
})


module.exports = router