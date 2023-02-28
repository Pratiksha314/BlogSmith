const NotificationWithFriendModel = require('../models/notification');


// if status is accepted, then that user will be added in the friend list
// and after that request will be deleted
exports.acceptRequestAddFriendInList = async function (req, res) {
    await NotificationWithFriendModel.findOne({ username: req.body.username }).then((function (data) {
        if (data) {
            NotificationWithFriendModel.collection.updateOne({ username: req.body.username },
                {
                    $addToSet: {
                        friendList: req.params.name
                    }
                }
            ).then(function(data)  {
                res.json({
                    msg: 'friend added to list', info: data
                })
            }, function(err) {
                res.json({
                    msg: 'failed to add in list', error: err
                })
            })
        }
    }))

    await NotificationWithFriendModel.findOne({username: req.params.name}).then((function(data){
        if(data){
            NotificationWithFriendModel.collection.updateOne({ username: req.params.name },
                {
                    $addToSet: {
                        friendList: req.body.username
                    }
                }
                ).then(function(data)  {
                    res.json({
                        msg: 'friend added to list', info: data
                    })
                }, function(err) {
                    res.json({
                        msg: 'failed to add in list', error: err
                    })
                })

        }
        }))
}