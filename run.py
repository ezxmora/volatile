#!/usr/bin/env python3
# encoding: utf-8

from utils.Volatile import Volatile
from utils.config import auth

bot = Volatile(auth)
tweets = bot.deletetweets()
retweets = bot.deleteretweets()
likes = bot.deletelikes()
bot.generatereport(True)
