var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemoSchema = new Schema({
    text: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

var Memo = mongoose.model('Memo', MemoSchema);

module.exports = { Memo };