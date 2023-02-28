const ChatModel = require('../models/chat');

exports.addChatMsg = async function (req, res) {
    const roomId = req.params.nameUser.slice(0, -10) + '_' + req.body.username.slice(0, -10)
    const chatRoomId = roomId.split("_")

    const chat = ChatModel({
        chatRoomId: chatRoomId,
        conversation: [
            {
                name: req.params.nameUser,
                message: req.body.message
            }
        ]
    });

    if (req.params.nameUser !== req.body.username) {
        await ChatModel.findOne({ chatRoomId: { $all: [req.params.nameUser.slice(0, -10), req.body.username.slice(0, -10)] } }).then(async function (data) {
            if (data) {
                // res.json({
                //     msg: 'chat room is already there.',info: data 
                // })

                await ChatModel.updateOne({ chatRoomId: { $all: [req.params.nameUser.slice(0, -10), req.body.username.slice(0, -10)] } },
                    {
                        $addToSet: {
                            conversation: [
                                {
                                    name: req.params.nameUser,
                                    message: req.body.message
                                }
                            ]
                        }
                    }
                ).then(function (data) {
                    res.json({
                        msg: 'msg has been addded', info: data
                    })
                }, (err) => {
                    res.json({
                        msg: 'failed to add msg', error: err
                    })
                }
                )
            }
            else {
                chat.save().then(function (data) {
                    res.json({
                        msg: 'chat room created and msg added', info: data
                    })
                }, (err) => {
                    res.json({
                        msg: 'failed to created chat room', error: err
                    })
                }
                )
            }
        })
    }
    else {
        res.json({
            msg: 'cannot send message to yourself !!'
        })
    }
}

exports.getChatMsg = async function (req, res) {
    if (req.params.nameUser !== req.body.username) {
        await ChatModel.findOne({ chatRoomId: { $all: [req.params.nameUser.slice(0, -10), req.body.username.slice(0, -10)] } }).then(async function (data) {
            if (data) {
                await ChatModel.findOne({ chatRoomId: { $all: [req.params.nameUser.slice(0, -10), req.body.username.slice(0, -10)] } }).then(function (data) {
                    res.json({
                        msg: 'conversations are there', info:data
                    })
                })
            }
            else {
                res.json({
                    msg: 'chat room not found'
                })
            }
        })
    }
    else {
        res.json({
            msg: 'cannot get message.'
        })
    }
}