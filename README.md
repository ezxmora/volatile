# Volatile
A Twitter bot for deleting tweets and unretweeting and disliking after certain time.

## Warning
__TWEET DELETION IS IRREVERSIBLE__

If for some reason you decide to execute this without configurating nothing at all and it deletes something that you didn't want to delete its all your fault for running code from a stranger on the Internet.

__I take no responsibility for erroneously deleted tweets__

## Features
  * Deletes tweets
  * Removes retweets that you made
  * Dislikes tweets
  * Configurable
  * Lightweight
  * Easy to use

## Setup
  * Install [Python](https://www.python.org/downloads/)
  * Get your Twitter keys at [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new).
  * Run `pip install -r requirements.txt` 
  * After installing the dependencies you'll need to create a .env file with this content:
    ```
    CONSUMER_KEY= Your consumer key
    CONSUMER_SECRET= Your consumer key secret
    ACCESS_TOKEN= Your access token
    ACCESS_SECRET= Your access token secret
    SCREEN_NAME= Your Twitter handle (@)
    RT_LIMIT= Threshold of YOUR retweets which are going to be deleted
    LIKES_LIMIT= Threshold of YOUR likes which are going to be deleted
    VOLATILITY_DAYS= Minimum days of for a tweet to not getting delered
    PINNED_TWEET_ID= ID of your pinned tweet
    ```
  * For starting the bot run `python run.py`

## Extra
  * If you don't want to manually run the bot you may want to set up a cronjob/Task Schedule depending your OS.
  * You may want to do all this in a [venv](https://docs.python.org/3/library/venv.html)

## How to save a tweet from being deleted
At the moment you can't, im working on it

## How do I get that ID?
In a Twitter URL the ID is this part:

`https://twitter.com/YOUR @ HERE/status/<THIS IS THE ID>`
