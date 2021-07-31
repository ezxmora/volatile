import time
from utils.helpers import is_older
from utils.config import config
import tweepy

screen_name = config['screen_name']

class Volatile:
    def __init__(self, authentication_dict):
        self.consumer_key = authentication_dict['consumer_key']
        self.consumer_secret = authentication_dict['consumer_secret']
        self.access_token = authentication_dict['access_token']
        self.access_secret = authentication_dict['access_secret']
        self.__data_tweets = []
        self.__data_retweets = []
        self.__data_likes = []

    def __auth(self):
        authentication = tweepy.OAuthHandler(
            self.consumer_key, self.consumer_secret)
        authentication.set_access_token(self.access_token, self.access_secret)
        return tweepy.API(authentication, retry_count=10, retry_delay=5, retry_errors=set([503]))

    def __gettweets(self, rts=False, replies=False):
        api = self.__auth()
        tweet_list = []
        tweets = api.user_timeline(
            screen_name=screen_name, count=200, include_rts=rts, exclude_replies=replies)
        tweet_list.extend(tweets)
        oldest_id = tweet_list[-1].id - 1

        while len(tweets) > 0:
            tweets = api.user_timeline(
                screen_name=screen_name, count=200, max_id=oldest_id, include_rts=rts, exclude_replies=replies)
            tweet_list.extend(tweets)
            oldest_id = tweet_list[-1].id - 1
            time.sleep(1)

        return [{
            'id': tweet.id_str,
            'date': round(tweet.created_at.timestamp()),
            'retweets': int(tweet.retweet_count),
            'likes': int(tweet.favorite_count),
            'retweeted': tweet.retweeted,
            'text': tweet.text} for tweet in tweet_list]

    def __getlikes(self):
        api = self.__auth()

        likes_list = []
        page = 0
        likes = api.favorites(screen_name=screen_name, count=200, page=page)
        likes_list.extend(likes)
        number_pages = round(api.get_user(
            screen_name=screen_name).favourites_count / 200) + 1

        while page < number_pages:
            likes = api.favorites(screen_name=screen_name,
                                  count=200, page=page)
            likes_list.extend(likes)
            page = page + 1
            time.sleep(1)

        return [{
            'id': like.id_str,
            'date': round(like.created_at.timestamp()),
            'favorited': like.favorited,
            'text': like.text
        } for like in likes_list]

    def deletetweets(self):
        api = self.__auth()
        tweets = self.__gettweets(False, True)
        deleted = 0
        skipped = 0

        print('Wiping tweets...')
        for i in range(len(tweets)):
            if is_older(tweets[i]['date']):
                if tweets[i]['retweets'] < config['rt_limit'] and tweets[i]['likes'] < config['likes_limit']:
                    deleted = deleted + 1
                    api.destroy_status(tweets[i]['id'])
                    time.sleep(0.5)
            else:
                skipped = skipped + 1

        self.__data_tweets = [deleted, skipped]

    def deleteretweets(self):
        api = self.__auth()
        tweets = self.__gettweets(True)
        deleted = 0
        skipped = 0

        print('Wiping retweets...')
        for i in range((len(tweets))):
            if is_older(tweets[i]['date']):
                if tweets[i]['retweeted']:
                    try:
                        deleted = deleted + 1
                        api.unretweet(tweets[i]['id'])
                        time.sleep(0.5)
                    except:
                        skipped = skipped + 1
                        pass
                else:
                    skipped = skipped + 1
            else:
                skipped = skipped + 1

        self.__data_retweets = [deleted, skipped]

    def deletelikes(self):
        api = self.__auth()
        likes = self.__getlikes()
        deleted = 0
        skipped = 0

        print('Wiping likes...')
        for i in range(len(likes)):
            if (is_older(likes[i]['date'])):
                if (likes[i]['favorited']):
                    try:
                        api.destroy_favorite(likes[i]['id'])
                        deleted = deleted + 1
                        time.sleep(0.5)
                    except:
                        skipped = skipped + 1
                        pass
                else:
                    skipped = skipped + 1
            else:
                skipped = skipped + 1

        self.__data_likes = [deleted, skipped]

    def generatereport(self, sendTweet=True):
        api = self.__auth()
        final_string = ''

        if len(self.__data_tweets) == 2:
            final_string += '💬 %d tweet/s have been deleted & %d skipped.\n' % (
                self.__data_tweets[0], self.__data_tweets[1])

        if len(self.__data_retweets) == 2:
            final_string += '🐦 %d tweet/s have been unretweeted & %d skipped.\n' % (
                self.__data_retweets[0], self.__data_retweets[1])

        if len(self.__data_likes) == 2:
            final_string += '💔 %d tweet/s have been disliked & %d skipped.\n' % (
                self.__data_likes[0], self.__data_likes[1])

        if len(final_string) > 0:
            print(final_string)
            if sendTweet:
                status_id = api.update_status(final_string + '\n\n🔗 More info @: https://github.com/ezxmora/volatile').id_str
                print('Your tweet report is here: https://twitter.com/%s/status/%s' %
                      (screen_name, status_id))
