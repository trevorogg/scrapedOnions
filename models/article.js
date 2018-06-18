var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true,
        unique: true
    },

    snippet: {
        type: String,
        required: true,
        unique: true
    },
    // array for user comments
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: 'note'
        }
    ]
});

var article = mongoose.model('article', ArticleSchema);

module.exports = article;