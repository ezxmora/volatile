// Required modules
const { twitConfig, screen_name, likesLimit, retweetLimit } = require('./config');
const { isOlder, omitSaved, error } = require('./helpers');
const Twit = require('twit');
const chalk = require('chalk');

// Instantiation of Twit
const bot = new Twit(twitConfig);

// Variable stores
let tweetCount = 0;
let tweetDelete = 0;

function getTweets() {
    bot.get('statuses/user_timeline', { screen_name, count: 200, include_rts: 0}, timelineProccessing);

    function timelineProccessing(err, tweets) {
        if (err) return error(err);

        tweetCount = tweets.length;

        new Promise((resolve, reject) => {
            let tweetIDs = [];
            tweets.forEach((tweet, iterator, array) => {
                if (tweet.retweet_count < parseInt(retweetLimit) || tweet.favorite_count < parseInt(likesLimit) ) {
                    if (isOlder(Date.parse(tweet.created_at))) {
                        tweetIDs.push(tweet.id_str);
                    }

                    if (iterator === array.length - 1) {
                        tweetDelete = tweetIDs.length;
                        resolve(tweetIDs);
                    }
                }
            });
        })
        .then((filterTweets) => {
            // Omits saved tweets in a JSON
            omitSaved(filterTweets)
                .then((filteredTweets) => {
                    filteredTweets.forEach((filtered) => {
                        bot.post('statuses/destroy/:id', {id: filtered}, (err, data, response) => {
                            if (err) error(err);
                        });
                    });
                })
                .catch((err) => error(err));
        })
        .then(() => console.log(chalk`{bgCyan INFO} {bold - ${tweetDelete} of ${tweetCount} tweet/s were removed.}`))
        .catch((err) => error(err));
    }
}

module.exports = getTweets();
