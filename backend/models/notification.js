const mongoose = require('mongoose')

const NotificationWithFriendSchema = mongoose.Schema({
    username: {type: String},
    requestSent: [
        {
            to: {type: String},
        }
    ],
    requestReceived: [
        {
            from: {type: String},
        }
    ],
    friendList: [{type: String}]
});

const NotificationWithFriendModel = mongoose.model('Notification', NotificationWithFriendSchema);
module.exports = NotificationWithFriendModel;