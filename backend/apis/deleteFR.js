const NotificationWithFriendModel = require('../models/notification');


// if we want to delete the request we have sent to someone 
// or after request has been sent to user, that has been accepted or deleted by them
// in both the cases the friend request from DB will be deleted

exports.deleteFriendRequest = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.params.NameUser }).then(async function (data) {
        if (data) {
            // when we want to cancel our/their request
            if (data.requestSent.some(x => x.to === req.body.username)) {
                await NotificationWithFriendModel.collection.updateOne({ username: req.params.NameUser },
                    {
                        $pull: { requestSent: { to: req.body.username } }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'deleted !!', info: data
                    })
                },
                    function (err) {
                        res.json({
                            msg: 'failed to delete', error: err
                        })
                    }
                )
            }
            else if (data.requestReceived.some(x => x.from === req.body.username)) {
                await NotificationWithFriendModel.collection.updateOne({ username: req.params.username },
                    {
                        $pull: { requestReceived: { from: req.body.username } }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'deleted !!', info: data
                    })
                },
                    function (err) {
                        res.json({
                            msg: 'failed to delete', error: err
                        })
                    }
                )
            }
        }
    })

    await NotificationWithFriendModel.findOne({ username: req.body.username }).then(async function (data) {
        if (data) {
            // when we want to cancel our/their request
            if (data.requestSent.some(x => x.to === req.params.NameUser)) {
                await NotificationWithFriendModel.collection.updateOne({ username: req.body.username },
                    {
                        $pull: { requestSent: { to: req.params.NameUser } }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'deleted !!', info: data
                    })
                },
                    function (err) {
                        res.json({
                            msg: 'failed to delete', error: err
                        })
                    }
                )
            }
            else if (data.requestReceived.some(x => x.from === req.params.NameUser)) {
                await NotificationWithFriendModel.collection.updateOne({ username: req.body.username },
                    {
                        $pull: { requestReceived: { from: req.params.NameUser } }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'deleted !!', info: data
                    })
                },
                    function (err) {
                        res.json({
                            msg: 'failed to delete', error: err
                        })
                    }
                )
            }
        }
    })
}

exports.removeFromFriend = async function (req, res) {
    await NotificationWithFriendModel.findOne({username: req.params.deleteName}).then(async function(data){
        if(data){
            await NotificationWithFriendModel.updateOne({username: req.params.deleteName},{
                $pull: {
                    friendList: req.body.username
                }
            }).then(function(data){
                res.json({
                    msg: 'removed from friend list', success: true, info: data
                })
            }, function(err){
                res.json({
                    msg: 'failed to remove from friend list', success: false, error: err
                })
            }
            )
        }
    })

    await NotificationWithFriendModel.findOne({username: req.body.username}).then(async function(data){
        if(data){
            await NotificationWithFriendModel.updateOne({username: req.body.username},{
                $pull: {
                    friendList: req.params.deleteName
                }
            }).then(function(data){
                res.json({
                    msg: 'removed from friend list', success: true, info: data
                })
            }, function(err){
                res.json({
                    msg: 'failed to remove from friend list', success: false, error: err
                })
            }
            )
        }
    })
}