const NotificationWithFriendModel = require('../models/notification');

// if we are sending friend request to someone and
// if someone has sent us a request

exports.sendFriendRequest = async function (req, res) {

    const notificationSentBody = NotificationWithFriendModel({
        username: req.params.fromUserName,
        requestSent: [
            {
                to: req.body.username,
            }
        ],
    })

    const notificationReceivedBody = NotificationWithFriendModel({
        username: req.body.username,
        requestReceived: [
            {
                from: req.params.fromUserName,
            }
        ],
    })

    await NotificationWithFriendModel.findOne({ username: req.params.fromUserName }).then(async function (data) {
        if (data) {
            if (data.requestSent.some(x => x.to === req.body.username)) {   // .some() is method from which we can check whether in array of object, the value already exits or not
                return res.json({
                    msg: ' request has been already sent ',
                })
            }
            else if (data.friendList.includes(req.body.username)) { // .includes() check whether value is present in array
                return res.json({
                    msg: ' already friend with them ',
                })
            }
            else {
                await NotificationWithFriendModel.collection.updateOne({ username: req.params.fromUserName },
                    {
                        $addToSet: {
                            requestSent:
                            {
                                to: req.body.username,
                            },
                        }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'added request!!', info: data, success: true
                    })
                }, function (err) {
                    res.json({
                        msg: 'failed to add request', error: err, success: false
                    })
                }
                )
            }
        }
        else {
            notificationSentBody.save().then(function (data) {
                res.json({
                    msg: 'request has been to database', success: true, info: data
                })
            },
                (err) => {
                    res.json({
                        msg: 'failed to add request in database', success: false, erro: err
                    })
                }
            )
        }
    })

    NotificationWithFriendModel.findOne({ username: req.body.username }).then(async function (data) {
        if (data) {
            if (data.requestReceived.some(i => i.from === req.params.fromUserName)) {
                return res.json({
                    msg: 'already request is there'
                })
            }
            else {
                await NotificationWithFriendModel.collection.updateOne({ username: req.body.username },
                    {
                        $addToSet: {
                            requestReceived:
                            {
                                from: req.params.fromUserName,
                            },
                        }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'added received request!!', info: data
                    })
                }, function (err) {
                    res.json({
                        msg: 'failed to add received request', error: err
                    })
                }
                )
            }
        }
        else {
            notificationReceivedBody.save().then(function (data) {
                res.json({
                    msg: 'request has been to received database', success: true, info: data
                })
            },
                (err) => {
                    res.json({
                        msg: 'failed to add request in received database', success: false, erro: err
                    })
                }
            )
        }
    })
}

exports.getRequestsSent = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.params.ourName }).then(function (data) {
        if (data) {
            if (data.requestSent.length > 0) {
                res.json({
                    msg: 'requests are there', info: data.requestSent
                })
            }
            else {
                res.json({
                    msg: 'No new friend requests are there', info: data.requestSent
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