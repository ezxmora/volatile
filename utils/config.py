from os import getenv
from dotenv import load_dotenv

load_dotenv()

auth = {
    'consumer_key': getenv('CONSUMER_KEY'),
    'consumer_secret': getenv('CONSUMER_SECRET'),
    'access_token': getenv('ACCESS_TOKEN'),
    'access_secret': getenv('ACCESS_SECRET'),
}

config = {
    'screen_name': getenv('SCREEN_NAME'),
    'volatility': int(getenv('VOLATILITY_DAYS')),  # 7 Days
    'rt_limit': int(getenv('RT_LIMIT')),  # Keep all YOUR tweets with at least n retweets
    'likes_limit': int(getenv('LIKES_LIMIT')),  # Keep all YOUR tweets with at least n likes
    'pinned': getenv('PINNED_TWEET_ID')
}
