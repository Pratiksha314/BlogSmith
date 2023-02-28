const UserModel = require('../models/user');

exports.updateProfilePhoto = async function (req, res) {
    UserModel.updateOne({ _id: req.params.userId },
        {
            $set: {
                profilePhoto: req.body.profilePhoto
            }
        }).then(
            function (info) {
                res.json({
                    msg: 'profile photo updated', success: true, info: info
                })
            }, function (err) {
                res.json({
                    msg: 'failed to update the profile photo', success: true, info: err
                })
            }
        )
}

exports.updateBackgroundProfilePhoto = async function (req, res) {
    UserModel.updateOne({ _id: req.params.userId },
        {
            $set: {
                backgroundProfilePhoto: req.body.backgroundProfilePhoto
            }
        }).then(
            function (info) {
                res.json({
                    msg: 'background profile photo updated', success: true, info: info
                })
            }, function (err) {
                res.json({
                    msg: 'failed to update the background profile photo', success: true, info: err
                })
            }
        )
}

exports.updateProfileName = async function (req, res) {
    await UserModel.findOne({ profileName: req.body.profileName }).then(function (data) {
        if (data) {
            res.json({
                msg: 'Name already Exists', success: false,
            });
        } else {
            UserModel.updateOne({ username: req.body.username },
                { $set: { profileName: req.body.profileName } }).then(function (data) {
                    res.json({
                        msg: 'updated successfully', success: true, uu: data
                    })
                }, function (err) {
                    res.json({
                        msg: 'failed to update', success: false
                    });
                }
                )
        }
    },
    );
}