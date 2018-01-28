var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemoSchema = new Schema({
    title: {
        type: String
    },
    contents: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: true
    }
});

var Memo = mongoose.model('Memo', MemoSchema);

module.exports = { Memo };