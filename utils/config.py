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
    'screen_name': 'Eriknaitor',
    'volatility': 7,
    'rt_limit': 3,
    'likes_limit': 3,
}
