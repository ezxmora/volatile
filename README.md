# Volatile
A Twitter bot for deleting tweets and unretweeting after certain time.

## Warning
__TWEET DELETION IS IRREVERSIBLE__

If for some reason you decide to execute this without configurating nothing at all and it deletes something that you didn't want to delete its all your fault for running code from a stranger on the Internet.

__I take no responsibility for erroneously deleted tweets__

## Features
* Deletes tweets
* Removes retweets that you made
* Configurable
* Lightweight
* Easy to use

## Setup
This is a [Node.js](https://nodejs.org/en/) program, so you'll need it for making it work.

Get your Twitter keys at [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new).

After the installation of Node.js just clone the repository, open the folder and run [npm install](https://docs.npmjs.com/downloading-and-installing-packages-locally) to get all the dependencies needed by the bot.

`$ npm install`

After installing the dependencies you'll need to create a .env file with this content:
```
CONSUMER_KEY='YOUR CONSUMER KEY'
CONSUMER_SECRET='YOUR CONSUMER SECRET'
ACCESS_TOKEN='YOUR ACCESS TOKEN'
ACCESS_SECRET='YOUR ACCESS SECRET'
SCREEN_NAME='YOUR TWITTER @'
RT_LIMIT=<LIMIT OF MINIMUM RTs>
LIKES_LIMIT=<LIMIT OF MINIMUM LIKES>
VOLATILITY_DAYS=<LIFETIME IN DAYS OF A TWEET>
SAVED_TWEET_FILENAME='THE NAME USED FOR THE FILE OF YOUR SAVED TWEETS'
```
>If you don't create this file the bot won't properly work.

For running the bot simply run `npm run start`.

### Extra
If you don't want to manually run the bot you may want to set up a cronjob/Task Schedule depending your OS.

## How to save a tweet from being deleted
If you want to save a tweet from being deleted you only have to add the ID of the tweet to in the array on the JSON file created by the bot.

#### How do I get that ID?
In a Twitter URL the ID is this part:

`https://twitter.com/YOUR @ HERE/status/<THIS IS THE ID>`
