module.exports = {
    twitConfig: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_SECRET,
    },
    screen_name: process.env.SCREEN_NAME,
    retweetLimit: process.env.RT_LIMIT,
    likesLimit: process.env.LIKES_LIMIT,
    volatility: process.env.VOLATILITY_DAYS,
    savedTweetsFilename: process.env.SAVED_TWEET_FILENAME
}
