var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true
    }

});

var note = mongoose.model('note', NoteSchema);

module.exports = note;