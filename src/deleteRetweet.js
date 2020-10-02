// Required modules
const { isOlder, error } = require('./helpers');
const { twitConfig, screen_name } = require('./config');
const Twit = require('twit');
const chalk = require('chalk');

// Instantiation of Twit
const bot = new Twit(twitConfig);

// Variable stores
let retweetDelete = 0;

function getRetweets() {
    bot.get('statuses/user_timeline', { screen_name, count: 200, include_rts: 1 }, timelineProccessing);

    function timelineProccessing(err, retweets) {
        if (err) return error(err);

        new Promise((resolve, reject) => {
            let retweetIDs = [];
            retweets.forEach((tweet, iterator, array) => {
                if (tweet.retweeted) {
                    if (isOlder(Date.parse(tweet.created_at))) {
                        retweetIDs.push(tweet.id_str);
                    }
                }

                if (iterator === array.length - 1) {
                    retweetDelete = retweetIDs.length;
                    resolve(retweetIDs);
                }
            })
        })
        .then((filterRetweets) => {
            filterRetweets.forEach((filtered) => {
                bot.post('statuses/unretweet/:id', {id: filtered}, (err, data, response) => {
                    if (err) error(err);
                })
            });
        })
        .then(() => console.log(chalk`{bgCyan INFO} {bold - ${retweetDelete} tweet/s were unretweeted.}`))
        .catch((err) => error(err));
    }
}

module.exports = getRetweets();
