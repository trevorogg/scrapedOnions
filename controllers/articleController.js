//dependencies
var request = require('request');
var cheerio = require('cheerio');

// models
var article = require('../models/article.js');
var note = require('../models/note.js');


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/articles');
    });

    app.get('/scrape', function (req, res) {
        request('https://www.theonion.com/', function (error, response, html) {
            var $ = cheerio.load(html);

            $('.post-wrapper').each(function (i, element) {
                var title = $(this)
                    .children('h1')
                    .children('a')
                    .text();

                var link = $(this)
                    .children('h1')
                    .children('a')
                    .attr('href');

                var snippet = $(this)
                    .children('div.text')
                    .text();

                if (title && link && snippet) {
                    // create empty object
                    var result = {};
                    // assign results to object
                    result.title = title;
                    result.link = link;
                    result.snippet = snippet;

                    article.create(result, function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(doc);
                        }
                    });
                }
            });
        });

        res.redirect('/');
    });

    app.get('/articles', function (req, res) {
        article.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.render('index', { result: doc });
            }
        }).sort({ 'id': -1 });
    });


    app.get('/articles/:id', function (req, res) {
        article.findOne({ '_id': req.params.id })
            .populate('note')
            .exec(function (error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.render('comments', { result: doc });
                }
            });
    });








}
