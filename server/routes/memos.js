var express = require('express');
var router = express.Router();
var { ObjectID } = require('mongodb');
var _ = require('lodash');

var { Memo } = require('./../models/memo');

// GET memos
router.get('/', (req, res) => {
    Memo.find()
        .then((memo) => {
            res.send({ memo });
        })
        .catch((e) => {
            res.status(400).send(e);
        })
});

// POST memo item
router.post('/', (req, res) => {
    var memo = new Memo({
        title: req.body.title,
        contents: req.body.text,
        createdAt: new Date
    });

    memo.save()
        .then((memo) => {
            res.send(memo);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

// GET memo item
router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Memo.findById(id)
        .then((memo) => {
            if (!memo) {
                res.status(404).send();
            }
            res.send(memo);
        })
        .catch((e) => {
            res.status(400).send(e);
        })
});

// UPDATE memo item
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['title', 'contents', 'isArchived']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    body.updatedAt = new Date;
    Memo.findByIdAndUpdate(id, { $set: body })
        .then((memo) => {
            if (!memo) {
                res.status(404).send();
            }

            res.send(memo);
        })
        .catch((e) => {
            res.status(400).send();
        })
    res.send(body);
});

// DELETE memo item
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Memo.findByIdAndRemove(id)
        .then((memo) => {
            if (!memo) {
                res.status(404).send();
            }

            res.send(memo);
        })
        .catch((e) => {
            res.status(400).send();
        })
});

module.exports = router;