import datetime
from time import time
from utils.config import config

def is_older(date):
    volatility_days = datetime.datetime.now() - datetime.timedelta(days=config.get('volatility'))
    return volatility_days.timestamp() >= date

def omit_saved(tweets):
    print(tweets)
