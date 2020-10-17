// Required modules
const mongoose = require('mongoose');
const Twit = require('twit');
const { error, info } = require('../modules/helpers');
const { twitConfig } = require('../config');

// Instantiation of Twit
const bot = new Twit(twitConfig);

// Schema of a user
const UserSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    screen_name: { type: String }
});

// Adds the screen_name (@) of a user before saving it
UserSchema.pre('save', function(next) {

    const _this = this;

    bot.get('users/show', { user_id: this.userID }, (err, data, response) => {
        if (err) error(err);

        _this.screen_name = data.screen_name;
        next();
    });
});

// Prints a message with the saved user ID after it has been saved.
UserSchema.post('save', function(doc, next) {
    info(`${doc.userID} has been saved`);
    next();
});

// Defining the schema
mongoose.model('User', UserSchema);
