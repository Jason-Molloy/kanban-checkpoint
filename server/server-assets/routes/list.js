let router = require('express').Router()
let Lists = require('../models/list')

let basePath = '/:boardId/lists'
//GET
router.get(basePath, (req, res, next) => {
    let boardId = req.params.boardId
    // console.log('[ListRequest]: ', boardId, "user:", req.session.uid.toString())
    Lists.find({ authorId: req.session.uid, boardId: boardId })
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
    req.body.authorId = req.session.uid;
    req.body.boardId = req.params.boardId
    Lists.create(req.body)
        .then(newList => {
            res.send(newList)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//PUT
router.put(basePath + '/:id', (req, res, next) => {
    Lists.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


//DELETE
router.delete(basePath + '/:id', (req, res, next) => {
    Lists.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid, boardId: req.params.boardId })
        .then(list => {
            res.send("Successfully Deleted")
        })
        .catch(err => {
            res.status(400).send('ACCESS DENIED; Invalid Request')
        })
})


module.exports = router