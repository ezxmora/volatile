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
    'screen_name': 'YOUR @ HERE',
    'volatility': 7,  # 7 Days
    'rt_limit': 50,  # Keep all YOUR tweets with at least n retweets
    'likes_limit': 200,  # Keep all YOUR tweets with at least n likes
}
