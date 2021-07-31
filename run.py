#!/usr/bin/env python3
# encoding: utf-8

from utils.Volatile import Volatile
from utils.config import auth

bot = Volatile(auth)
bot.deletetweets()
bot.deleteretweets()
bot.deletelikes()

bot.generatereport(True)
