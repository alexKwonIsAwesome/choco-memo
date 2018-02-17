var express = require('express');
var router = express.Router();
var { ObjectID } = require('mongodb');
var _ = require('lodash');

var { Memo } = require('./../models/memo');

// GET memos
router.get('/', async (req, res) => {
    try {
        const memos = await Memo.find();
        res.send({ memos });
    } catch (e) {
        res.status(400).send(e);
    }
});

// POST memo item
router.post('/', async (req, res) => {
    try {
        const memoInstance = new Memo({
            title: req.body.title,
            contents: req.body.contents,
            createdAt: new Date
        });
        const memo = await memoInstance.save();
        res.send(memo);
    } catch (e) {
        res.status(400).send(e);
    }
});

// GET memo item
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        const memo = await Memo.findById(id);
        
        if (!memo) {
            res.status(404).send();
        }
        res.send(memo);
    } catch (e) {
        res.status(400).send(e);
    }
});

// UPDATE memo item
router.patch('/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const body = _.pick(req.body, ['title', 'contents', 'isArchived']);
    
        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        body.updatedAt = new Date;
    
        const memo = await Memo.findByIdAndUpdate(id, { $set: body });
    
        if (!memo) {
            res.status(404).send();
        }
        res.send(memo);
    } catch (e) {
        res.status(400).send(e);
    }
});

// DELETE memo item
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
    
        const memo = await Memo.findByIdAndRemove(id);
    
        if (!memo) {
            res.status(404).send();
        }

        res.send(memo);
    } catch (e) {
        res.status(400).send(e);
    }

});

module.exports = router;