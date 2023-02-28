const NotificationWithFriendModel = require('../models/notification');

// to get the received request from other users
exports.getOtherPeopleRequests = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.body.username }).then(function (data) {
        if (data) {
            if (data.requestReceived.length > 0) {
                res.json({
                    msg: 'requests are there', info: data.requestReceived
                })
            }
            else {
                res.json({
                    msg: 'No new friend requests are there', info: data.requestReceived
                })
            }
        }
        else if (!data) {
            res.json({
                msg: 'There is no data available.',
            })
        }
    })
}

exports.getFriendList = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.params.username }).then(function (data) {
        if (data) {
            if (data.friendList.length > 0) {
                res.json({
                    msg: 'friend list is there', info: data.friendList, success: true
                })
            }
            else {
                res.json({
                    msg: 'No friend is there', success: false
                })
            }
        }
        else if (!data) {
            res.json({
                msg: 'There is no data available.',
            })
        }
    })
}

exports.getWholeData = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.body.username }).then(function (data) {
        if(data){
            res.json({
                msg: 'data found', info: data
            })
        }
        else{
            res.json({
                msg: 'data not found', 
            })
        }
    }
    )
}