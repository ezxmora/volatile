// Required modules
const { volatility, savedTweetsFilename } = require('./config');
const fs = require('fs');
const chalk = require('chalk');

// Variables
const currentDate = Date.now();
const volatilityDays = ((24 * 60 * 60 * 1000) * volatility);

module.exports = {
    isOlder: (date) => {
        return date < currentDate - volatilityDays;
    },

    error: (err) => {
        return console.log(chalk`{bgRed ERROR} {bold - There was an error :(} \n\t${err}`);
    },

    omitSaved: (tweetList) => {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(`${savedTweetsFilename}.json`)) {
                fs.writeFileSync(`${savedTweetsFilename}.json`, '{"tweets":[]}', (err) => {
                    if (err) return module.exports.error(err);
                    reject(console.log(chalk`{bgCyan INFO} {bold - ${savedTweetsFilename}.json has been created}`));
                });
            } else {
                let modifiedArray = [];
                const savedTweetsJSON = JSON.parse(fs.readFileSync(`${savedTweetsFilename}.json`, 'utf8'));

                tweetList.forEach((tweetID, iterator, array) => {
                    if (!savedTweetsJSON.tweets.includes(tweetID)) {
                        modifiedArray.push(tweetID);
                    }

                    if (iterator === array.length - 1) resolve(modifiedArray);
                });
            }
        })
        .catch((err) => module.exports.error(err));
    }
}
