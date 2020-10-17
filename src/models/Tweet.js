// Required modules
const mongoose = require('mongoose');
const Twit = require('twit');
const { error, info } = require('../modules/helpers');
const { twitConfig } = require('../config');

// Instantiation of Twit
const bot = new Twit(twitConfig);

// Schema of a tweet
const TweetSchema = new mongoose.Schema({
    tweetID: { type: String, required: true },
    content: { type: String }
});

// Adds the content of the tweet to the model before saving it
TweetSchema.pre('save', function(next) {

    const _this = this;

    bot.get('statuses/show', { id: this.tweetID }, (err, data, response) => {
        if (err) error(err);

        _this.content = data.text;
        next();
    });
});

// Prints a message with the saved tweet ID after it has been saved.
TweetSchema.post('save', function(doc, next) {
    info(`${doc.tweetID} has been saved`);
    next();
});

// Defining the schema
mongoose.model('Tweet', TweetSchema);
