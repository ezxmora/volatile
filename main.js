// Required modules
const fs = require('fs');
const config = require('dotenv').config({ path: __dirname + '/config.env' });
const { error } = require('./src/helpers');
const chalk = require('chalk');
const { getTweets } = require('./src/deleteTweet');
const { getRetweets } = require('./src/deleteRetweet');

if (config.error) {
    const envConfig = `CONSUMER_KEY='YOUR CONSUMER KEY'\nCONSUMER_SECRET='YOUR CONSUMER SECRET'\nACCESS_TOKEN='YOUR ACCESS TOKEN'\nACCESS_SECRET='YOUR ACCESS SECRET'\nSCREEN_NAME='YOUR TWITTER @'\nRT_LIMIT=<LIMIT OF MINIMUM RTs YOU WANT TO SET>\nLIKES_LIMIT=<LIMIT OF MINIMUM LIKES YOU WANT TO SET>\nVOLATILITY_DAYS=<NUMBER OF TWEETS LIFETIME>\nSAVED_TWEET_FILENAME='THE NAME USED FOR THE FILE OF YOUR SAVED TWEETS'\nALL YOU HAD TO DO WAS CREATE THE DAMN CONFIG FILE CJ (Delete this line :D)\n`;
    fs.writeFileSync('config.env', envConfig, (err) => {
        if (err) return error(err);
    });
    console.log(chalk`{bgCyan INFO} {bold - A config file has been created}`);

} else {
    for (const key in config.parsed) {
        if (config.parsed[key].trim().length <= 0 || config.parsed[key].includes('YOU')) {
            return error(`You didn't configure ${key} in the configuration file.`);
        }
    } 
    
    if (isNaN(process.env.RT_LIMIT) && isNaN(process.env.LIKES_LIMIT) && isNaN(process.env.VOLATILITY_DAYS)) {
        return error('RT_LIMIT, LIKES_LIMIT or VOLATILITY_DAYS is not a number');
    } else {
        getTweets();
        getRetweets();
    }
}
